import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md bg-background/70">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center font-display text-xl text-primary-foreground group-hover:rotate-6 transition-transform">
            F
          </div>
          <span className="font-display text-xl tracking-wider">FORGE/FIT</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Get Access
          </Link>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="uppercase text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
