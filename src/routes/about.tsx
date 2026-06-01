import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GMS Gym Management System" },
      { name: "description", content: "GMS is a Nairobi strength & conditioning gym built around expert coaching and modern fitness tracking." },
      { property: "og:title", content: "About — GMS" },
      { property: "og:description", content: "A modern gym built around coaching and data." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">About GMS</span>
          <h1 className="font-display text-6xl md:text-9xl mt-4">Built for<br />the people<br /><span className="text-primary">who show up.</span></h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 space-y-16">
        <div>
          <h2 className="font-display text-4xl text-primary">Our story</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            GMS opened its doors in Westlands with a simple idea: a gym should feel less like a turnstile
            and more like a team. We hire coaches who actually coach, fit out the floor with the equipment
            serious lifters and everyday athletes both need, and build the software that holds it all together.
          </p>
        </div>

        <div>
          <h2 className="font-display text-4xl text-primary">What we believe</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Progress isn't a vibe — it's measured. Every member gets a dashboard, a coach, and a plan.
            We track sessions, sleep, weight, and PRs so the work you put in today shows up clearly tomorrow.
            That's it. No mirrors-and-marketing fluff.
          </p>
        </div>

        <div>
          <h2 className="font-display text-4xl text-primary">The space</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            12,000 square feet of dedicated training floor. Eight competition lifting platforms,
            a turfed conditioning lane, two group studios, a recovery room, and showers that don't
            run cold. Open 5am to 10pm on weekdays, 7am to 8pm on weekends.
          </p>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="font-display text-5xl mb-12">By the numbers</h2>
          <div className="grid md:grid-cols-4 gap-px bg-border">
            {[
              ["1,200+", "Active members"],
              ["24", "Certified coaches"],
              ["80+", "Classes per week"],
              ["94%", "Member retention"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background p-10">
                <div className="font-display text-5xl text-primary">{n}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h3 className="font-display text-4xl md:text-6xl">Come see the floor.</h3>
        <Link to="/contact" className="mt-8 inline-flex bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-wider hover:bg-primary/90 transition">
          Book a tour →
        </Link>
      </section>
    </>
  );
}
