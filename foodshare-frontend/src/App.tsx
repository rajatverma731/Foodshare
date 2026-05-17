import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar"; // Ensure this path is correct
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import DonatePage from "./pages/DonatePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="foodshare-theme" attribute="class">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {/* Navbar stays here so it never unmounts during route changes */}
          <Navbar /> 
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;