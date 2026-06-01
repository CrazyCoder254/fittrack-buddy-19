import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Project Proposal — GMS | Final Year Project, KCA University" },
      { name: "description", content: "BBIT 04105 Final Year Project: Gym Management System (GMS) by Roy Mukuha — background, objectives, scope, methodology, and schedule." },
      { property: "og:title", content: "Project Proposal — GMS" },
      { property: "og:description", content: "BBIT 04105 Final Year Project, KCA University." },
      { property: "og:url", content: "/project" },
    ],
    links: [{ rel: "canonical", href: "/project" }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Project Proposal</span>
              <h1 className="font-display text-5xl md:text-8xl mt-4 leading-[0.9]">
                Gym Management<br /><span className="text-primary">System (GMS).</span>
              </h1>
              <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
                A web-based platform that unifies gym administration with digital fitness tracking,
                serving members, trainers, and administrators in a single, role-aware system.
              </p>
            </div>
            <dl className="md:col-span-4 space-y-4">
              {[
                ["Candidate", "Roy Mukuha"],
                ["Course", "BBIT — KCA University"],
                ["Unit", "BBIT 04105"],
                ["Supervisor", "—"],
                ["Year", "Final Year Project I"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-display">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* BACKGROUND + PROBLEM */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-16">
        <article>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">01 · Background</span>
          <h2 className="font-display text-4xl mt-3">Why this project</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The fitness industry continues to grow alongside rising awareness of health and wellness.
            However, many gyms still rely on manual or fragmented systems to manage memberships, training,
            and member progress — leading to lost data, poor adherence, and limited insight for both
            members and management.
          </p>
        </article>
        <article>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">02 · Problem Statement</span>
          <h2 className="font-display text-4xl mt-3">The gap</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Existing fitness apps focus on individual tracking while gym management tools handle only
            operations. Neither side talks to the other. GMS closes that gap with one integrated platform
            that handles memberships, payments, workouts, nutrition, and trainer–client relationships.
          </p>
        </article>
      </section>

      {/* OBJECTIVES */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">03 · Objectives</span>
              <h2 className="font-display text-5xl mt-3">What the system delivers</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Six measurable goals derived from the proposal — each mapped to features implemented in the live system.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 gap-px bg-border">
            {[
              "Design a centralized digital platform for gym operations",
              "Enable members to track workouts, nutrition, and progress accurately",
              "Equip trainers with tools to monitor and guide multiple clients",
              "Automate membership, subscriptions, and payment processing",
              "Generate analytical reports to support data-driven decisions",
              "Improve member motivation through structured programs and feedback",
            ].map((o, i) => (
              <li key={o} className="bg-background flex gap-6 p-8">
                <span className="font-display text-3xl text-primary w-12">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg leading-snug">{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SCOPE / USERS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">04 · Scope</span>
        <h2 className="font-display text-5xl mt-3 mb-12">Three roles, one system</h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {[
            { r: "Member", d: "Workout logging, nutrition tracking, class bookings, progress charts, billing history." },
            { r: "Trainer", d: "Client roster, program builder, session notes, adherence monitoring, performance review." },
            { r: "Administrator", d: "Member registry, subscriptions, payments, trainer assignments, revenue & activity reports." },
          ].map((x, i) => (
            <div key={x.r} className="bg-background p-10">
              <span className="font-display text-5xl text-primary/30">0{i + 1}</span>
              <h3 className="font-display text-2xl mt-4">{x.r}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">05 · Methodology</span>
          <h2 className="font-display text-5xl mt-3 mb-12">Agile, iterative, accountable</h2>
          <div className="grid md:grid-cols-6 gap-6">
            {[
              ["Analysis", "Requirements & SRS"],
              ["Design", "Architecture & UX"],
              ["Build", "React + TanStack + Postgres"],
              ["Test", "Unit, Integration, UAT"],
              ["Deploy", "Hosting & go-live"],
              ["Maintain", "Optimize & extend"],
            ].map(([t, d], i) => (
              <div key={t} className="relative border-t-2 border-primary pt-6">
                <div className="absolute -top-3 left-0 w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <h4 className="font-display text-xl">{t}</h4>
                <p className="text-sm text-muted-foreground mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">06 · Schedule</span>
        <h2 className="font-display text-5xl mt-3 mb-12">24-week plan</h2>
        <div className="space-y-px bg-border">
          {[
            ["01", "Proposal Approval", "Week 1–2", "Approved Proposal"],
            ["02", "Data Collection", "Week 3–5", "Research Data"],
            ["03", "System Analysis & Design", "Week 6–9", "System Designs"],
            ["04", "System Development", "Week 10–17", "Working System"],
            ["05", "System Testing", "Week 18–20", "Test Reports"],
            ["06", "Deployment", "Week 21–22", "Deployed System"],
            ["07", "Documentation", "Week 23–24", "Final Report"],
          ].map(([n, t, w, d]) => (
            <div key={n} className="bg-background grid grid-cols-12 gap-4 p-6 items-center hover:bg-card transition">
              <div className="col-span-2 font-display text-3xl text-primary">{n}</div>
              <div className="col-span-4 font-display text-xl">{t}</div>
              <div className="col-span-3 text-sm uppercase tracking-widest text-muted-foreground">{w}</div>
              <div className="col-span-3 text-sm text-muted-foreground text-right">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">07 · Tech Stack</span>
            <h3 className="font-display text-4xl mt-3">Modern, type-safe, deployable</h3>
            <p className="mt-4 text-muted-foreground">
              Chosen for scalability, developer velocity, and a production-grade footprint that mirrors industry practice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              ["React 19", "Frontend UI"],
              ["TanStack Start", "Routing & SSR"],
              ["TypeScript", "Type safety"],
              ["Tailwind CSS", "Design system"],
              ["PostgreSQL", "Relational DB"],
              ["Supabase", "Auth & data API"],
              ["Row-Level Security", "Role-based access"],
              ["Vite", "Build tooling"],
            ].map(([n, r]) => (
              <div key={n} className="bg-background p-6">
                <div className="font-display text-xl">{n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES + CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">08 · Deliverables</span>
          <h3 className="font-display text-4xl mt-3">What is shipped</h3>
          <ul className="mt-6 space-y-3">
            {[
              "Approved Project Proposal document",
              "System Requirements Specification (SRS)",
              "Working web application (this site)",
              "Database schema with role-based access control",
              "User Acceptance Test (UAT) report",
              "Final project report & defense presentation",
            ].map((d) => (
              <li key={d} className="flex gap-3 border-t border-border pt-3 text-sm">
                <span className="text-primary">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border p-10">
          <h4 className="font-display text-3xl">Try the live system</h4>
          <p className="mt-3 text-muted-foreground text-sm">
            The website you're browsing is the live deliverable. Sign in to access the role-based dashboards for members, trainers, and administrators.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/login" className="bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary/90 transition">
              Sign in →
            </Link>
            <Link to="/features" className="border border-border px-6 py-3 font-bold uppercase tracking-wider text-sm hover:border-primary transition">
              View features
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
