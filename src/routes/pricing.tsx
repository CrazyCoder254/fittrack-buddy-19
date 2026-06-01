import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Membership — GMS Gym Management System" },
      { name: "description", content: "Simple, honest gym memberships in Nairobi. Day passes from KES 800, full membership from KES 3,500/month." },
      { property: "og:title", content: "Membership — GMS" },
      { property: "og:description", content: "Simple, honest gym memberships in Nairobi." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Day Pass",
    price: "800",
    period: "per visit",
    desc: "One full day of access. Perfect for travellers or trying us out.",
    features: ["Full gym access", "Open gym hours", "Locker & showers", "1 group class included"],
    cta: "Buy day pass",
  },
  {
    name: "Member",
    price: "3,500",
    period: "per month",
    desc: "Unlimited access to the floor, classes, and the GMS app.",
    features: [
      "Unlimited gym access",
      "All group classes",
      "Workout & nutrition tracking",
      "Mobile check-in",
      "Pause anytime",
    ],
    cta: "Join now",
    highlight: true,
  },
  {
    name: "Coached",
    price: "9,900",
    period: "per month",
    desc: "Everything in Member, plus a dedicated coach and a custom plan.",
    features: [
      "Everything in Member",
      "Personal coach",
      "Custom program",
      "Nutrition coaching",
      "Weekly 1-on-1 check-in",
    ],
    cta: "Start coached",
  },
];

function PricingPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Membership</span>
          <h1 className="font-display text-6xl md:text-9xl mt-4">Simple.<br /><span className="text-primary">Honest.</span></h1>
          <p className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground">
            One floor, one app, three ways to train. No joining fees. No long contracts. Pause anytime.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative p-10 border ${p.highlight ? "border-primary bg-card" : "border-border bg-background"}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-10 bg-primary text-primary-foreground text-xs px-3 py-1 font-bold uppercase tracking-widest">
                  Most popular
                </span>
              )}
              <h2 className="font-display text-3xl">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">KES</span>
                <span className="font-display text-6xl">{p.price}</span>
                <span className="text-sm text-muted-foreground">/ {p.period}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 border-t border-border/50 pt-3">
                    <span className="text-primary">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`mt-10 block text-center px-8 py-4 font-bold uppercase tracking-wider text-sm transition ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:border-primary"
                }`}
              >
                {p.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl mb-12">Frequently asked</h2>
          <div className="space-y-px bg-border">
            {[
              ["Is there a joining fee?", "No. What you see is what you pay."],
              ["Can I pause my membership?", "Yes — pause for up to 8 weeks per year directly from the app."],
              ["Do you offer corporate plans?", "Yes. Teams of 5+ get 15% off. Contact us for details."],
              ["What payment methods do you accept?", "M-Pesa, Visa, Mastercard. Auto-renew on file, cancel anytime."],
            ].map(([q, a]) => (
              <details key={q} className="bg-background p-6 group">
                <summary className="font-display text-xl cursor-pointer flex justify-between items-center">
                  {q}
                  <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
