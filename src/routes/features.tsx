import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — GMS Gym Management System" },
      { name: "description", content: "Workouts, nutrition, coach dashboards, memberships, and bookings — all in one app for GMS members." },
      { property: "og:title", content: "Features — GMS" },
      { property: "og:description", content: "Everything a modern gym needs, in one app." },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesPage,
});

const features = [
  { cat: "Members", title: "Workout Tracking", desc: "Log every set, watch volume and PRs climb over time, never guess what to do next." },
  { cat: "Members", title: "Nutrition & Meal Logs", desc: "Daily meal logging with macro targets set by your coach, not a generic algorithm." },
  { cat: "Members", title: "Class Bookings", desc: "Reserve your spot in any class from your phone. Cancel up to two hours before — no penalties." },
  { cat: "Coaches", title: "Client Dashboard", desc: "See every client's adherence, last session, and weekly trend in one view." },
  { cat: "Coaches", title: "Program Builder", desc: "Assign workouts and macro targets to one client or a whole group in a few clicks." },
  { cat: "Coaches", title: "Session Notes", desc: "Voice or text notes attached to each session, visible to the member next time they train." },
  { cat: "Membership", title: "Easy Sign-up", desc: "Join online in under three minutes. Pause or cancel anytime, no awkward phone calls." },
  { cat: "Membership", title: "Mobile Check-in", desc: "QR code at the door. No card, no queue, contactless." },
  { cat: "Membership", title: "Billing & Receipts", desc: "M-Pesa and card on file. Auto-renews, transparent receipts, no surprise charges." },
];

function FeaturesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Everything in one app</span>
          <h1 className="font-display text-6xl md:text-9xl mt-4">Your gym,<br /><span className="text-primary">in your pocket.</span></h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            From the moment you sign up to the day you hit a new PR, GMS gives members and coaches
            one shared platform — no spreadsheets, no paper logs, no missed payments.
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
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-4xl md:text-6xl">Built for the way<br />a real gym runs.</h3>
            <p className="mt-4 text-muted-foreground">
              No clipboards. No "let me check with reception." Every member, coach, and admin works from the same data — updated live.
            </p>
            <Link to="/pricing" className="mt-8 inline-flex bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition">
              See memberships →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              ["Live", "Class capacity"],
              ["Auto", "M-Pesa billing"],
              ["Daily", "Coach check-ins"],
              ["Always", "Progress visible"],
            ].map(([n, r]) => (
              <div key={r} className="bg-background p-6">
                <div className="font-display text-2xl text-primary">{n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
