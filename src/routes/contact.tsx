import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GMS Gym Management System" },
      { name: "description", content: "Visit GMS in Westlands, Nairobi. Book a tour, ask about memberships, or send us a message." },
      { property: "og:title", content: "Contact — GMS" },
      { property: "og:description", content: "Visit GMS in Westlands, Nairobi." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Get in touch</span>
            <h1 className="font-display text-6xl md:text-8xl mt-4">Come<br />say hi.</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Booking a tour, asking about a membership, or just curious — drop us a message and we'll reply within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2 space-y-8">
          {[
            ["Visit", "GMS — Westlands, Nairobi"],
            ["Hours", "Mon–Fri 5am–10pm · Sat–Sun 7am–8pm"],
            ["Phone", "+254 711 000 000"],
            ["Email", "hello@gms.co.ke"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-border pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
              <div className="font-display text-xl mt-1">{v}</div>
            </div>
          ))}
        </div>
        <form
          className="md:col-span-3 space-y-6"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
            <input required className="mt-2 w-full bg-card border border-border px-4 py-3 focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input required type="email" className="mt-2 w-full bg-card border border-border px-4 py-3 focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">How can we help?</label>
            <textarea required rows={6} className="mt-2 w-full bg-card border border-border px-4 py-3 focus:border-primary focus:outline-none" />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-60"
          >
            {sent ? "Message sent ✓" : "Send message →"}
          </button>
        </form>
      </section>
    </>
  );
}
