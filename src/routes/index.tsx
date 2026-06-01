import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-gym.jpg";
import gripImg from "@/assets/grip.jpg";
import trainerImg from "@/assets/trainer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GMS — Gym Management System | Train. Track. Transform." },
      { name: "description", content: "GMS is a modern gym in Nairobi with expert coaches, smart fitness tracking, and a community that shows up. Memberships from KES 3,500/mo." },
      { property: "og:title", content: "GMS — Gym Management System" },
      { property: "og:description", content: "Train with expert coaches. Track every rep. Own your progress." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Athlete training in the GMS strength floor"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 noise-bg opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nairobi · Established 2024</span>
          </div>
          <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
            Train hard.<br />
            <span className="text-primary">Track smart.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            GMS is a modern strength &amp; conditioning gym powered by a built-in
            fitness tracking platform. Real coaches, real equipment, real data —
            so every session moves you forward.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/pricing" className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary/90 transition">
              Start free trial →
            </Link>
            <Link to="/features" className="border border-border px-8 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition">
              Tour the gym
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            ["1,200+", "Active Members"],
            ["24", "Expert Coaches"],
            ["80+", "Weekly Classes"],
            ["12,000sqft", "Training Floor"],
          ].map(([n, l]) => (
            <div key={l} className="px-6 py-10 text-center">
              <div className="font-display text-4xl md:text-5xl text-primary">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY GMS */}
      <section className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square overflow-hidden order-2 md:order-1">
          <img src={gripImg} alt="Chalked hands gripping a barbell at GMS" width={1280} height={1280} loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 ring-1 ring-inset ring-border" />
        </div>
        <div className="order-1 md:order-2">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Why GMS</span>
          <h2 className="font-display text-5xl md:text-7xl mt-4">
            A gym that<br />remembers you.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Most gyms hand you a key card and forget about you. At GMS, every workout,
            class check-in, and PR is logged in your personal dashboard — and shared
            with your coach so the next session is sharper than the last.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Personal coach assigned on day one",
              "Workouts &amp; nutrition tracked automatically",
              "Membership, billing &amp; bookings in one app",
              "Open 7 days · Westlands, Nairobi",
            ].map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary" />
                <span className="uppercase tracking-wider text-muted-foreground" dangerouslySetInnerHTML={{ __html: p }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Programs</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4">Find your<br />training.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Whether you're chasing a first pull-up or your first 200kg deadlift, there's a program — and a coach — built for it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { n: "Strength", t: "Barbell Club", d: "Squat, bench, deadlift, press. Small groups capped at 8, coached every session.", items: ["3x / week", "Form video review", "Programmed cycles"] },
              { n: "Conditioning", t: "GMS Method", d: "High-intensity classes mixing kettlebells, sled, rower, and bodyweight strength.", items: ["45 min sessions", "All fitness levels", "Live heart-rate display"] },
              { n: "1-on-1", t: "Personal Training", d: "Fully tailored programming, nutrition coaching, and weekly check-ins with a dedicated coach.", items: ["Custom plan", "Macro coaching", "Weekly progress reviews"] },
            ].map((r, i) => (
              <div key={r.n} className="bg-background p-10 group hover:bg-card transition">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-6xl text-primary/30 group-hover:text-primary transition">0{i + 1}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{r.n}</span>
                </div>
                <h3 className="font-display text-3xl mt-6">{r.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 border-t border-border/50 pt-2">
                      <span className="text-primary">→</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Coaches</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4">The team in<br />your corner.</h2>
            <p className="mt-6 text-muted-foreground">
              Every GMS coach is certified, vetted, and continuously trained. They write your program, watch your form, and celebrate every PR with you.
            </p>
            <img src={trainerImg} alt="GMS coach demonstrating a lift" width={1280} height={1600} loading="lazy" className="mt-10 w-full aspect-[4/5] object-cover grayscale" />
          </div>
          <ol className="md:col-span-7 space-y-px bg-border">
            {[
              ["Amani", "Head Strength Coach", "Powerlifting · 10 yrs"],
              ["Wanjiru", "Conditioning Lead", "CrossFit L3 · Pre/Postnatal"],
              ["Brian", "Personal Training", "Sports Science MSc"],
              ["Leila", "Nutrition Coach", "Registered Dietitian"],
              ["Kevin", "Mobility & Recovery", "FRC · Sports Massage"],
              ["Zawadi", "Group Fitness", "Spin · HIIT · Yoga"],
            ].map(([name, role, cred]) => (
              <li key={name} className="bg-background flex gap-6 p-8 hover:bg-card transition items-center">
                <span className="w-14 h-14 bg-primary text-primary-foreground font-display text-2xl flex items-center justify-center">{name[0]}</span>
                <div className="flex-1">
                  <div className="font-display text-2xl">{name}</div>
                  <div className="text-sm text-muted-foreground">{role}</div>
                </div>
                <span className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground">{cred}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Members</span>
          <h2 className="font-display text-5xl md:text-7xl mt-4 mb-16">Real people.<br />Real results.</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { q: "Lost 14kg in six months and finally pulled a bodyweight deadlift. The dashboard kept me honest.", n: "Faith K.", r: "Member, 1 year" },
              { q: "I bounced between gyms for years. GMS is the first place where the coach actually knows my program.", n: "David O.", r: "Member, 8 months" },
              { q: "Booking classes, paying my dues, logging meals — all in one place. It just works.", n: "Mercy N.", r: "Member, 2 years" },
            ].map((t) => (
              <figure key={t.n} className="bg-background p-10">
                <blockquote className="font-display text-2xl leading-tight">“{t.q}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-bold">{t.n}</div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h2 className="font-display text-6xl md:text-9xl">
          Your first week<br /><span className="text-primary">is on us.</span>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground text-lg">
          Walk in, train with a coach, try a class, take a tour. No card required.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link to="/pricing" className="bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-wider hover:bg-primary/90 transition">
            Claim free week →
          </Link>
          <Link to="/contact" className="border border-border px-10 py-5 font-bold uppercase tracking-wider hover:border-primary transition">
            Book a tour
          </Link>
        </div>
      </section>
    </>
  );
}
