import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Membership" },
    { to: "/project", label: "Project" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md bg-background/70">
      <div className="bg-primary text-primary-foreground text-[10px] md:text-xs tracking-[0.2em] uppercase text-center py-1.5 px-4">
        Final Year Project · KCA University · BBIT 04105 · Roy Mukuha
      </div>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary flex items-center justify-center font-display text-base text-primary-foreground group-hover:rotate-6 transition-transform">GMS</div>
          <span className="hidden sm:inline font-display text-lg tracking-wider">Gym Management System</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium tracking-wide uppercase hover:text-primary"
                activeProps={{ className: "text-primary" }}>Dashboard</Link>
              <button onClick={async () => { await signOut(); navigate({ to: "/" }); }}
                className="bg-primary text-primary-foreground px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary/90">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary text-primary-foreground px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary/90">
              Join Now
            </Link>
          )}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" aria-label="Menu">
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-foreground transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="uppercase text-sm font-medium" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="uppercase text-sm font-medium" onClick={() => setOpen(false)}>Dashboard</Link>
              <button onClick={async () => { await signOut(); setOpen(false); navigate({ to: "/" }); }}
                className="uppercase text-sm font-medium text-left">Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="uppercase text-sm font-medium" onClick={() => setOpen(false)}>Join Now</Link>
          )}
        </nav>
      )}
    </header>
  );
}
