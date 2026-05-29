import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-gym.jpg";
import gripImg from "@/assets/grip.jpg";
import trainerImg from "@/assets/trainer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORGE/FIT — Gym Management & Fitness Tracking System" },
      { name: "description", content: "Unify gym operations, trainer dashboards, and member performance tracking in one platform." },
      { property: "og:title", content: "FORGE/FIT — Gym Management & Fitness Tracking" },
      { property: "og:description", content: "Unify gym operations, trainer dashboards, and member performance tracking." },
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
          alt="Athlete deadlifting in a dark gym"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 noise-bg opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">KCA / BBIT 04105 / Final Year Project</span>
          </div>
          <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
            Train hard.<br />
            <span className="text-primary">Manage smart.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            FORGE/FIT is an integrated Gym Management and Fitness Tracking System that
            unifies membership operations, trainer workflows, and member performance
            into one disciplined platform.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/features" className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary/90 transition">
              See the system →
            </Link>
            <Link to="/about" className="border border-border px-8 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition">
              The proposal
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            ["03", "User Roles"],
            ["24", "Week Build"],
            ["6", "Dev Phases"],
            ["∞", "PRs Tracked"],
          ].map(([n, l]) => (
            <div key={l} className="px-6 py-10 text-center">
              <div className="font-display text-5xl md:text-6xl text-primary">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">01 / The Problem</span>
          <h2 className="font-display text-5xl md:text-7xl mt-4">
            Pen, paper,<br />and lost progress.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Members lose workout logs. Trainers juggle clients without centralized data.
            Admins drown in manual membership and payment paperwork. Existing apps track
            individuals — they don't run a gym.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Inconsistent workout tracking", "No trainer-client visibility", "Manual membership chaos", "Zero performance analytics"].map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary" />
                <span className="uppercase tracking-wider text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-square overflow-hidden">
          <img src={gripImg} alt="Hands gripping a chalked barbell" width={1280} height={1280} loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 ring-1 ring-inset ring-border" />
        </div>
      </section>

      {/* THREE ROLES */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">02 / The Solution</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4">One system.<br />Three roles.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Role-based access ensures every user sees exactly what matters — and nothing they don't.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { n: "Member", t: "Track every rep", d: "Personalized workout plans, meal logging, visual progress analytics, and automated feedback to keep momentum.", items: ["Workout library", "Nutrition plans", "Progress charts", "Goal tracking"] },
              { n: "Trainer", t: "Coach at scale", d: "Assign programs, monitor adherence, evaluate trends across every client from a single command center.", items: ["Client dashboard", "Program builder", "Adherence stats", "Performance review"] },
              { n: "Admin", t: "Run the floor", d: "Automated membership, subscriptions, payments, and reporting to remove the paperwork drag.", items: ["Member registry", "Billing & subs", "Staff management", "Analytics reports"] },
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

      {/* OBJECTIVES */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">03 / Objectives</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4">What we<br />will ship.</h2>
            <img src={trainerImg} alt="Trainer coaching a client" width={1280} height={1600} loading="lazy" className="mt-10 w-full aspect-[4/5] object-cover grayscale" />
          </div>
          <ol className="md:col-span-7 space-y-px bg-border">
            {[
              "Design a centralized digital platform for gym operations",
              "Enable members to track workouts, nutrition, and progress accurately",
              "Equip trainers with tools to monitor and guide multiple clients",
              "Automate membership, subscriptions, and payment processing",
              "Generate analytical reports for data-driven decisions",
              "Boost member motivation through structured programs and feedback",
            ].map((o, i) => (
              <li key={o} className="bg-background flex gap-6 p-8 hover:bg-card transition">
                <span className="font-display text-3xl text-primary w-12">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg pt-1">{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* METHODOLOGY TIMELINE */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">04 / Methodology</span>
          <h2 className="font-display text-5xl md:text-7xl mt-4 mb-16">Agile, iterative, accountable.</h2>
          <div className="grid md:grid-cols-6 gap-6">
            {[
              ["Analysis", "Requirements & SRS"],
              ["Design", "Architecture & UX"],
              ["Build", "React + Node + Postgres"],
              ["Test", "Unit, Integration, UAT"],
              ["Deploy", "Hosting & go-live"],
              ["Maintain", "Optimize & extend"],
            ].map(([t, d], i) => (
              <div key={t} className="relative border-t-2 border-primary pt-6">
                <div className="absolute -top-3 left-0 w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <h4 className="font-display text-2xl">{t}</h4>
                <p className="text-sm text-muted-foreground mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h2 className="font-display text-6xl md:text-9xl">
          No more<br /><span className="text-stroke">excuses.</span>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground text-lg">
          A unified platform that bridges gym management and fitness tracking — built as a final year project at KCA University.
        </p>
        <Link to="/contact" className="mt-10 inline-flex bg-primary text-primary-foreground px-10 py-5 font-bold uppercase tracking-wider hover:bg-primary/90 transition">
          Request a demo →
        </Link>
      </section>
    </>
  );
}
