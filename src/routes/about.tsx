import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — FORGE/FIT" },
      { name: "description", content: "The proposal, background, methodology, and schedule behind FORGE/FIT." },
      { property: "og:title", content: "About — FORGE/FIT" },
      { property: "og:description", content: "Proposal, background, methodology, and schedule." },
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
          <span className="text-xs uppercase tracking-[0.3em] text-primary">The Proposal</span>
          <h1 className="font-display text-6xl md:text-9xl mt-4">A final year<br />commitment.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 space-y-16">
        <div>
          <h2 className="font-display text-4xl text-primary">Background</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            The fitness industry has grown rapidly alongside awareness of preventive health and wellness.
            Yet many gyms still rely on manual or semi-digital systems for memberships, workouts, and progress.
            FORGE/FIT integrates gym administration with digital fitness tracking — a single platform for members, trainers, and administrators.
          </p>
        </div>

        <div>
          <h2 className="font-display text-4xl text-primary">Problem Statement</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Members struggle to track workouts and meals. Trainers can't keep tabs on multiple clients without centralized data.
            Existing fitness apps focus on individuals, ignoring memberships and payments. FORGE/FIT closes that gap.
          </p>
        </div>

        <div>
          <h2 className="font-display text-4xl text-primary">Literature</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Research shows digital tracking improves adherence and outcomes. Apps like MyFitnessPal, Fitbit, and Nike Training Club
            offer logging but lack admin tools. Gym management tools handle ops but lack tracking. The literature consistently
            recommends a unified approach — which is exactly what this project delivers.
          </p>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="font-display text-5xl mb-12">Project Schedule</h2>
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-3 gap-12">
        {[
          ["Candidate", "Roy Mukuha"],
          ["Course", "BBIT — KCA University"],
          ["Unit", "BBIT 04105 / Final Year Project 1"],
        ].map(([k, v]) => (
          <div key={k} className="border-t-2 border-primary pt-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="font-display text-2xl mt-2">{v}</div>
          </div>
        ))}
      </section>
    </>
  );
}
