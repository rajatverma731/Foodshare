import Layout from "@/components/Layout";
import AvailableCarousel from "@/components/AvailableCarousel";
import Typewriter from "@/components/Typewriter";
import { Button } from "@/components/ui/button";
import { MOCK_LISTINGS } from "@/lib/data";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Users, TrendingUp, Utensils, HandHeart, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const carouselListings = MOCK_LISTINGS.filter((l) => l.status === "available");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Data-speed parallax elements
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "1");
        gsap.to(el, {
          y: () => (1 - speed) * 300,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      // Trailing entry text animation
      gsap.from(".hero-trail", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      });

      // Trailing fade-out on scroll
      gsap.to(".hero-trail", {
        y: -50,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Global Scroll Entry Animations
      gsap.utils.toArray<HTMLElement>(".scroll-animate").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Utensils, value: "12,500+", label: "Meals Shared" },
    { icon: Leaf, value: "3,200 kg", label: "Waste Prevented" },
    { icon: Users, value: "850+", label: "Active Donors" },
    { icon: TrendingUp, value: "95%", label: "Claim Rate" },
  ];

  const features = [
    { icon: HandHeart, title: "Easy Donations", desc: "List your surplus food in under a minute" },
    { icon: ShieldCheck, title: "Quality Assured", desc: "All donations follow food safety guidelines" },
    { icon: Users, title: "Community Driven", desc: "Connect with local organizations and neighbors" },
  ];

  return (
    <Layout>
      <div ref={pageRef} className="relative w-full overflow-hidden">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 via-background to-background relative z-10 overflow-hidden pt-10 md:pt-16">
          {/* Decorative Floating Elements for Parallax */}
          <div className="absolute top-[15%] left-[10%] text-primary/20 pointer-events-none" data-speed="0.8">
            <Leaf className="h-16 w-16 opacity-50" />
          </div>
          <div className="absolute top-[30%] right-[10%] text-primary/20 pointer-events-none" data-speed="1.4">
            <Heart className="h-20 w-20 opacity-40 -rotate-12" />
          </div>
          <div className="absolute bottom-[20%] left-[20%] text-primary/20 pointer-events-none" data-speed="0.6">
            <Utensils className="h-12 w-12 opacity-50 rotate-12" />
          </div>
          <div className="absolute bottom-[15%] right-[25%] text-primary/20 pointer-events-none" data-speed="1.2">
            <Leaf className="h-10 w-10 opacity-60 rotate-45" />
          </div>

          <div className="hero-container container mx-auto px-4 py-20 text-center md:py-32 relative z-10 text-foreground">
            <div className="mx-auto max-w-4xl animate-fade-in">
              <div className="hero-trail mb-6 inline-flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-md px-5 py-2 text-sm font-semibold shadow-sm border border-border">
                <Heart className="h-4 w-4 text-primary" fill="currentColor" /> Share Food, Share Love
              </div>
              <h1 className="hero-trail mb-6 text-5xl font-extrabold tracking-tight md:text-7xl drop-shadow-sm font-poppins text-foreground">
                Don't let good food <br className="hidden md:block" />
                <span className="text-primary">go to waste.</span>
              </h1>
              <p className="hero-trail mx-auto mb-10 max-w-2xl text-lg md:text-xl text-muted-foreground font-medium min-h-[90px] sm:min-h-[60px] font-sans">
                <Typewriter 
                  strings={[
                    "Connect surplus food from your home or business with those who need it.",
                    "Bridge the gap between excess food and empty plates—because every meal counts.",
                    "Redirect fresh, untouched meals to families and local organizations.",
                    "Join our community of donors making a real human impact."
                  ]} 
                />
              </p>
              <div className="hero-trail flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md font-semibold rounded-full px-8" asChild>
                  <Link to="/donate">
                    Donate Food <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-background border-border text-foreground hover:bg-muted hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-full px-8" asChild>
                  <Link to="/listings">
                    Browse Listings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="-mt-8 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <SpotlightCard key={s.label} className="scroll-animate">
                  <div className="flex flex-col items-center p-5 text-center h-full">
                    <s.icon className="mb-2 h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings Carousel */}
        <section className="bg-background py-24 relative overflow-hidden">
          {/* More Parallax Elements */}
          <div className="absolute top-[10%] right-[5%] text-primary/20 pointer-events-none" data-speed="0.7">
            <Heart className="h-24 w-24 opacity-30 rotate-12" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-end justify-between relative scroll-animate">
              <div>
                <h2 className="text-3xl font-bold">Available Now</h2>
                <p className="text-muted-foreground">Fresh food ready for pickup</p>
              </div>
              
              <Button variant="ghost" className="mr-24 hidden md:block text-primary" asChild>
                <Link to="/listings">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="scroll-animate">
              <AvailableCarousel listings={carouselListings} />
            </div>
            
            <div className="mt-8 flex justify-center md:hidden scroll-animate">
              <Button variant="outline" className="text-primary border-primary" asChild>
                <Link to="/listings">
                  View All Listings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted py-24 relative">
          {/* Parallax Element */}
          <div className="absolute bottom-[30%] left-[5%] text-primary/20 pointer-events-none" data-speed="1.3">
            <Utensils className="h-20 w-20 opacity-40 -rotate-12" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-2 text-3xl font-bold scroll-animate">How It Works</h2>
            <p className="mb-10 text-muted-foreground scroll-animate">Three simple steps to share food</p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { step: "1", title: "List Your Food", desc: "Add details about your surplus food — type, quantity, and pickup location." },
                { step: "2", title: "Get Requests", desc: "Receive requests from verified organizations and individuals nearby." },
                { step: "3", title: "Share & Impact", desc: "Approve a request, arrange pickup, and make a real difference." },
              ].map((item) => (
                <SpotlightCard key={item.step} className="bg-card rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-animate">
                  <div className="p-8 text-center h-full">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-background py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <SpotlightCard key={f.title} className="bg-card rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-animate">
                  <div className="flex gap-4 p-8 items-start h-full">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <f.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
          {/* CTA specific Parallax layer */}
          <div className="absolute top-[20%] right-[15%] text-primary-foreground/20 pointer-events-none" data-speed="0.8">
            <Heart className="h-32 w-32 opacity-20 rotate-12" />
          </div>
          <div className="absolute bottom-[10%] left-[10%] text-primary-foreground/20 pointer-events-none" data-speed="1.2">
            <Leaf className="h-24 w-24 opacity-20 -rotate-45" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10 scroll-animate">
            <h2 className="mb-4 text-3xl font-bold">Ready to Make a Difference?</h2>
            <p className="mx-auto mb-6 max-w-md opacity-90">
              Join thousands of donors and recipients working together to eliminate food waste.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-muted rounded-full px-8 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md" asChild>
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 rounded-full px-8 hover:scale-105 transition-all duration-300" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
