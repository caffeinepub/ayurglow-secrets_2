import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/health", label: "Health" },
  { to: "/skin", label: "Skin Care" },
  { to: "/hair", label: "Hair Care" },
  { to: "/lifestyle", label: "Lifestyle" },
  { to: "/chronic", label: "Chronic Health" },
  { to: "/blog", label: "Blog" },
  { to: "/admin", label: "Admin" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm shadow-xs"
      data-ocid="header.section"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" data-ocid="header.logo.link">
          <img
            src="/assets/generated/ayurglow-logo-transparent.dim_400x120.png"
            alt="AyurGlow Secrets"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          data-ocid="header.nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to, link.exact)
                  ? "text-brand-blue bg-blue-50 font-semibold"
                  : "text-foreground/70 hover:text-brand-blue hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              data-ocid="header.mobile-menu.button"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72"
            data-ocid="header.mobile-menu.sheet"
          >
            <div className="flex items-center justify-between mb-6">
              <img
                src="/assets/generated/ayurglow-logo-transparent.dim_400x120.png"
                alt="AyurGlow Secrets"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to, link.exact)
                      ? "text-brand-blue bg-blue-50 font-semibold"
                      : "text-foreground/70 hover:text-brand-blue hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
