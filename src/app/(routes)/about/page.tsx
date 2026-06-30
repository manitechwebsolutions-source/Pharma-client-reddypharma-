"use client";

import { motion } from "motion/react";
import { SiteLayout, Section } from "@/components/site/Layout";

const founderImage = "/assets/founder.png";
const shopImage = "/assets/shop.jpg";

const VALUES = [
  {
    t: "Integrity",
    d: "Only genuine medicines, fair prices, no upselling — ever.",
  },
  {
    t: "Care",
    d: "We treat every customer like family. Your health is personal to us.",
  },
  {
    t: "Speed",
    d: "Fast service in-store, on call, and at your door.",
  },
  {
    t: "Knowledge",
    d: "Qualified pharmacists ready to answer questions clearly.",
  },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <Section className="!max-w-5xl">
        {/* Hero Section with Shop Background */}
        <div
          className="relative overflow-hidden rounded-3xl min-h-[450px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${shopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-center px-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-widest">About Us</p>

            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold">
              A Pharmacy Bengaluru Trusts
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-white/90 text-lg">
              Serving families with genuine medicines, trusted advice, and compassionate care for
              over 7 years.
            </p>
          </div>
        </div>

        {/* Founder Image */}
        <div className="-mt-16 flex justify-center relative z-20">
          <img
            src={founderImage}
            alt="Founder"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-background shadow-2xl"
          />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-3xl p-8 md:p-12 space-y-10 shadow-card"
        >
          {/* Story Section */}
          <div>
            <h2 className="text-2xl font-bold">Our Story</h2>

            <div className="mt-6 grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src={founderImage}
                  alt="Founder of Reddy Pharmacy"
                  className="w-52 h-52 rounded-2xl object-cover shadow-lg border"
                />
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Reddy Pharmacy started as a small neighbourhood shop with a simple mission — make
                  quality healthcare easy and trustworthy for every family in Bengaluru. Over a
                  decade later, that mission is still the heart of everything we do.
                </p>

                <div className="mt-5">
                  <h3 className="font-semibold text-lg">Mr. Vishnu Reddy, Founder</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    "Our goal has always been simple: provide genuine medicines, honest guidance,
                    and care that every family can rely on."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold">Our Mission</h2>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              To deliver genuine medicines, honest advice, and friendly service — quickly, every
              single time. From a paracetamol pickup to managing chronic care, we're here for every
              stage of your health journey.
            </p>
          </div>

          {/* Trust Section */}
          <div>
            <h2 className="text-2xl font-bold">Why Customers Trust Us</h2>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              Thousands of families, doctors, and clinics rely on us because we never compromise on
              authenticity, we answer the phone, and we go the extra mile to make healthcare
              convenient and dependable.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold">Our Values</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl bg-secondary/50 p-4"
                >
                  <h4 className="font-semibold">{v.t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
    </SiteLayout>
  );
}
