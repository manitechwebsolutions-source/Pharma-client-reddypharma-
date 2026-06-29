import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Truck, Clock, HeartHandshake,
  ArrowRight, Phone, Star, MapPin, Package,
  FileText, Search, HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/Layout";
import { SITE, waLink } from "@/lib/site";
import heroBg from "@/assets/reddypharma.jpg";
import catMedicines from "@/assets/medicines.png";
import catSupplements from "@/assets/supplements.png";
import catPersonal from "@/assets/personalcare.png";
import catBaby from "@/assets/baby care.png";
import catEquipment from "@/assets/medicalwquipment.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reddy Pharmacy — Trusted Local Pharmacy in Bengaluru" },
      { name: "description", content: "Genuine medicines, fast home delivery, prescription assistance and health products in Bengaluru. Order via WhatsApp." },
      { property: "og:title", content: "Reddy Pharmacy — Trusted Local Pharmacy in Bengaluru" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Pharmacy",
        name: SITE.name,
        telephone: SITE.phone,
        email: SITE.email,
        address: { "@type": "PostalAddress", streetAddress: "MG Road", addressLocality: "Bengaluru", addressRegion: "Karnataka", postalCode: "560001", addressCountry: "IN" },
        areaServed: "Bengaluru",
      }),
    }],
  }),
  component: Home,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[640px] md:min-h-[720px] flex items-center">
      <img
        src={heroBg}
        alt="Pharmacy background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:pt-32 md:pb-28 w-full relative z-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white border border-white/20"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Open now · Home delivery in Bengaluru
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white"
          >
            Your trusted local <br />
            pharmacy in <span className="text-emerald-300">Bengaluru</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-5 text-lg text-white/80 max-w-xl"
          >
            Genuine medicines, prescription assistance and doorstep delivery — care your family can count on.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 text-base h-12 px-6">
              <Link to="/request">Request Medicine <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6 text-base bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              <a href={waLink("Hi! I'd like to order medicines.")} target="_blank" rel="noopener noreferrer">
                Contact on WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { n: 1000, s: "+", label: "Happy customers" },
              { n: 4.2, s: "★", label: "Google rating" },
              { n: 7, s: "+ yrs", label: "Serving Bengaluru" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {s.n < 10 ? s.n : <Counter to={s.n} />}{s.s}
                </div>
                <div className="text-xs text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: ShieldCheck, title: "Genuine Medicines", desc: "Sourced from licensed distributors — every batch verified." },
  { icon: Clock, title: "Fast Service", desc: "Skip the queue. Quick fulfilment on every order." },
  { icon: Truck, title: "Home Delivery", desc: "Doorstep delivery within 2km radius, often within an hour." },
  { icon: HeartHandshake, title: "Trusted Locally", desc: "Family-run since years — known for honest, caring service." },
];

const CATS = [
  { img: catMedicines, name: "Medicines" },
  { img: catSupplements, name: "Supplements" },
  { img: catPersonal, name: "Personal Care" },
  { img: catBaby, name: "Baby Care" },
  { img: catEquipment, name: "Medical Equipment" },
];

const SERVICES = [
  { title: "Home Delivery", desc: "Free doorstep delivery  within 2km radius.", icon: Package },
  { title: "Prescription Assistance", desc: "Send a photo — we'll read it, dispense, and confirm.", icon: FileText },
  { title: "Medicine Availability", desc: "Can't find a medicine? We'll source it for you fast.", icon: Search },
  { title: "Health Products", desc: "Supplements, devices, baby care and daily essentials.", icon: HeartPulse },
];

const REVIEWS = [
  { name: "Manohar Reddy.", text: "Some of the rare medicines are available and also available home delivery....", stars: 5 },
  { name: "Mohanrao Boligarla.", text: "Nice....", stars: 5 },
  { name: "Sneha M.", text: "Best pharmacy in the area. WhatsApp ordering is super convenient.", stars: 5 },
  { name: "Mallikarjuna Reddy.", text: "Gud responsibility...", stars: 5 },
];

function Home() {
  return (
    <SiteLayout>
      <Hero />

      {/* Why choose us */}
      <Section>
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Why choose us</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">Care you can trust</h2>
          <p className="mt-3 text-muted-foreground">Built on transparency, speed, and personal service.</p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 h-full shadow-card hover:shadow-glow transition-shadow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-soft">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{w.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section className="!py-12">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Popular categories</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Shop by category</h2>
            </div>
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/products">Browse all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <Link to="/products">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl h-48 border border-border/60 group cursor-pointer shadow-card"
                >
                  <img src={c.img} alt={c.name} loading="lazy" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs mt-1 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section>
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Our services</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">More than just a pharmacy</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="rounded-2xl p-6 bg-card border border-border/60 shadow-card hover:shadow-glow transition-shadow h-full">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-soft">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section>
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Customer love</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">What our customers say</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-6 h-full shadow-card">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">"{r.text}"</p>
                <div className="mt-4 text-sm font-semibold">{r.name}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Map */}
      <Section>
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Visit us</p>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">Find us in Bengaluru</h2>
              <p className="mt-3 text-muted-foreground">Walk in, pick up, or ask our pharmacists anything. We're here to help.</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5" /><span>{SITE.address}</span></div>
                <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /><a href={`tel:${SITE.phoneRaw}`} className="hover:text-primary">{SITE.phone}</a></div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-glow border border-border/60 aspect-[4/3]">
              <iframe
                src={SITE.mapEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reddy Pharmacy location"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center text-primary-foreground shadow-glow"
               style={{ background: "var(--gradient-primary)" }}>
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative text-3xl md:text-5xl font-extrabold">Need medicines quickly?</h2>
            <p className="relative mt-3 opacity-90 max-w-xl mx-auto">Message us on WhatsApp or call now — we'll have it ready or at your doorstep.</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 h-12 px-6">
                <a href={waLink("Hi! I need medicines quickly.")} target="_blank" rel="noopener noreferrer">WhatsApp Order</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
                <a href={`tel:${SITE.phoneRaw}`}><Phone className="mr-1 h-4 w-4" /> Call Now</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
