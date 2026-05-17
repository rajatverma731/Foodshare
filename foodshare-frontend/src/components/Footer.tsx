import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 shadow-sm">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-poppins">FoodShare</span>
          </Link>
          <p className="mt-4 text-sm text-slate-300">
            Connecting surplus food with those who need it most. Reduce waste, feed communities.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold font-poppins">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/listings" className="hover:text-green-400 transition-colors">Browse Food</Link>
            <Link to="/donate" className="hover:text-green-400 transition-colors">Donate Food</Link>
            <Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold font-poppins">Support</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/about" className="hover:text-green-400 transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-green-400 transition-colors">Privacy & Terms</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold font-poppins">Impact</h4>
          <div className="space-y-1 text-sm text-slate-300">
            <p>🍽️ 12,500+ meals shared</p>
            <p>🌍 3,200+ kg waste saved</p>
            <p>❤️ 850+ active donors</p>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
        © 2026 FoodShare. Made with ❤️ to fight food waste.
      </div>
    </div>
  </footer>
);

export default Footer;
