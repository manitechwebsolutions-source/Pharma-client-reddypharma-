"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/Layout";
import { SITE, waLink } from "@/lib/site";

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: SITE.phone,
      href: waLink("Hi! I have a question."),
    },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Address", value: SITE.address },
  ];
  return (
    <SiteLayout>
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Get in touch
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">We're here to help</h1>
          <p className="mt-3 text-muted-foreground">
            Reach us any way you like — we usually reply within minutes.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {items.map((it, i) => (
              <motion.a
                key={it.label}
                href={it.href ?? "#"}
                target={it.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 shadow-card hover:shadow-glow transition-shadow"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{it.label}</div>
                  <div className="font-semibold truncate">{it.value}</div>
                </div>
              </motion.a>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-sog h-12 px-6"
              >
                <a
                  href={waLink("Hi! I'd like to order medicines.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6 glass">
                <a href={`tel:${SITE.phoneRaw}`}>Call Now</a>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-glow border border-border/60 aspect-square lg:aspect-auto lg:min-h-[420px]"
          >
            <iframe
              src={SITE.mapEmbed}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Reddy Pharmacy location"
            />
          </motion.div>
        </div>
      </Section>
    </SiteLayout>
  );
}
