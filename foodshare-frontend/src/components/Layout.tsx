import { ReactNode } from "react";
import Footer from "./Footer";
// Remove the Navbar import since we won't use it here

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    {/* Navbar is removed from here because it's now in App.tsx */}
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;