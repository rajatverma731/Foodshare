import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import FoodCard from "./FoodCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface AvailableCarouselProps {
  listings: any[];
}

const AvailableCarousel = ({ listings }: AvailableCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".carousel-item");
      
      // Initialize the horizontal loop
      loopRef.current = horizontalLoop(items, {
        paused: false,
        repeat: -1,
        speed: 1,
        paddingRight: 24, // Matches your gap-6 (1.5rem = 24px)
      });
    }, containerRef);

    return () => ctx.revert();
  }, [listings]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Custom Navigation Buttons positioned above the carousel */}
      <div className="absolute -top-16 right-0 flex gap-2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => loopRef.current.previous({ duration: 0.4, ease: "power1.inOut" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => loopRef.current.next({ duration: 0.4, ease: "power1.inOut" })}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* The Carousel Track */}
      <div className="flex overflow-hidden py-4">
        <div className="flex no-scrollbar">
          {listings.map((listing) => (
            <div 
              key={listing.id} 
              className="carousel-item flex-shrink-0 w-[350px] md:w-[400px]"
            >
              <FoodCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- GSAP Horizontal Loop Helper ---
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export default AvailableCarousel;