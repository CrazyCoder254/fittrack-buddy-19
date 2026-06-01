import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-primary flex items-center justify-center font-display text-base text-primary-foreground">GMS</div>
            <span className="font-display text-xl tracking-wider">Gym Management System</span>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm">
            A modern gym, built around the people who show up. Train with coaches who know your name,
            track every session, and own your progress.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-muted-foreground mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="hover:text-primary">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Membership</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-muted-foreground mb-4">Visit</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Westlands, Nairobi</li>
            <li>Mon–Fri 5am – 10pm</li>
            <li>Sat–Sun 7am – 8pm</li>
            <li>+254 711 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GMS — Gym Management System. All rights reserved.
      </div>
    </footer>
  );
}
