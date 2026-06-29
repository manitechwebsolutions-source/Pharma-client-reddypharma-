import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Truck, FileText, Search, Heart, Syringe, Calendar } from "lucide-react";
import { SiteLayout, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Reddy Pharmacy" },
      { name: "description", content: "Home delivery, prescription assistance, medicine sourcing, and health products from Reddy Pharmacy Bengaluru." },
      { property: "og:title", content: "Services — Reddy Pharmacy" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Truck, title: "Home Delivery", desc: "Free doorstep delivery  within 2km radius. Same-day in most areas." },
  { icon: FileText, title: "Prescription Assistance", desc: "Send a photo of your prescription — we'll read, verify, and prepare it." },
  { icon: Search, title: "Medicine Sourcing", desc: "Can't find a rare or imported medicine? We source it for you within 24–48 hours." },
  { icon: Heart, title: "Health Products", desc: "Supplements, wellness, baby care, beauty, and personal care essentials." },
  { icon: Syringe, title: "Medical Equipment", desc: "BP monitors, glucometers, nebulizers, oximeters and more — with usage guidance." },
  { icon: Calendar, title: "Refill Reminders", desc: "Tell us your chronic medication — we'll remind and refill on time." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">What we offer</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">Pharmacy services in Bengaluru</h1>
          <p className="mt-3 text-muted-foreground">From prescription pickup to chronic care — we make pharmacy effortless.</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-7 shadow-card hover:shadow-glow transition-shadow"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-soft">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-semibold text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
