import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — FORGE/FIT" },
      { name: "description", content: "Workouts, nutrition, trainer tools, memberships, and analytics in one platform." },
      { property: "og:title", content: "Features — FORGE/FIT" },
      { property: "og:description", content: "Workouts, nutrition, trainer tools, memberships, and analytics." },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesPage,
});

const features = [
  { cat: "Member", title: "Workout Library", desc: "Programs categorized by goal and body part with progressive overload built-in." },
  { cat: "Member", title: "Nutrition Tracking", desc: "Meal planning, macro tracking, and recommendations aligned to fitness goals." },
  { cat: "Member", title: "Progress Analytics", desc: "Charts for volume, frequency, PRs, and body composition over time." },
  { cat: "Trainer", title: "Client Dashboard", desc: "See every client's adherence, recent sessions, and red-flag trends at a glance." },
  { cat: "Trainer", title: "Program Builder", desc: "Drag-and-drop assignment of workouts and macro targets to one or many clients." },
  { cat: "Trainer", title: "Performance Review", desc: "Side-by-side comparisons and automated session notes for coaching." },
  { cat: "Admin", title: "Membership Management", desc: "Registration, profiles, and lifecycle management in one place." },
  { cat: "Admin", title: "Payments & Subscriptions", desc: "Automated billing, renewals, and revenue tracking." },
  { cat: "Admin", title: "Reports & Insights", desc: "Attendance, churn, revenue, and trainer performance reporting." },
];

function FeaturesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Capabilities</span>
          <h1 className="font-display text-6xl md:text-9xl mt-4">Every feature,<br /><span className="text-primary">on purpose.</span></h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Nine focused capabilities across three roles. No bloat, no parallel tools — one platform doing the whole job.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {features.map((f, i) => (
            <article key={f.title} className="bg-background p-10 hover:bg-card transition group">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-xs uppercase tracking-widest text-primary">{f.cat}</span>
                <span className="font-display text-2xl text-muted-foreground/30 group-hover:text-primary transition">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="font-display text-3xl">{f.title}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-4xl">Built on a modern stack</h3>
            <p className="mt-4 text-muted-foreground">React, Node.js, PostgreSQL — chosen for scale, type-safety, and developer velocity.</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {[["React", "Frontend"], ["Node.js", "Backend"], ["PostgreSQL", "Database"], ["Git", "Version control"]].map(([n, r]) => (
              <div key={n} className="bg-background p-6">
                <div className="font-display text-2xl">{n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
