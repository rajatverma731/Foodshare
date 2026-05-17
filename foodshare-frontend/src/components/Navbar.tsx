import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/listings", label: "Listings" },
    { to: "/donate", label: "Donate" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const idx = links.findIndex((l) => isActive(l.to));
      const btn = btnRefs.current[idx];
      const nav = navRef.current;

      if (btn && nav) {
        const navRect = nav.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        setIndicatorStyle({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
          opacity: 1, 
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    const timeoutId = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full px-4 md:px-8 bg-background/80 backdrop-blur-xl rounded-b-[2rem] shadow-sm transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Left Side: Navigation Links */}
          <div className="hidden md:flex flex-1 items-center gap-2 relative" ref={navRef}>
            <div
              className="absolute h-9 bg-primary/10 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                ref={(el) => { btnRefs.current[i] = el; }}
                className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex flex-1 md:flex-none justify-center items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 shadow-sm">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">FoodShare</span>
          </Link>

          {/* Right Side: Actions */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-6">
            <ThemeToggle />
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:scale-105"
            >
              Get started <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex md:hidden items-center gap-3">
             <ThemeToggle />
             <button
                className="text-muted-foreground hover:text-foreground p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden py-6 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium px-4 py-2 rounded-xl transition-colors ${
                    isActive(link.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 mt-2 flex flex-col gap-4 border-t border-border px-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center text-base font-medium text-foreground py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center text-base font-medium bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;