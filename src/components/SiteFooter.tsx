import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary flex items-center justify-center font-display text-xl text-primary-foreground">F</div>
            <span className="font-display text-xl tracking-wider">FORGE/FIT</span>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm">
            One platform for gym operations and member performance. Built for trainers, members, and admins.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-muted-foreground mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="hover:text-primary">Features</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest text-muted-foreground mb-4">Project</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Roy Mukuha</li>
            <li>BBIT 04105</li>
            <li>KCA University</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FORGE/FIT — Final Year Project, KCA University.
      </div>
    </footer>
  );
}
