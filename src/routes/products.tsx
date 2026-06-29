import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/Layout";
import { CATEGORIES } from "@/lib/products";
import { useProducts } from "@/lib/productStore";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Reddy Pharmacy" },
      { name: "description", content: "Browse medicines, supplements, personal care, baby care and medical equipment available at Reddy Pharmacy." },
      { property: "og:title", content: "Products — Reddy Pharmacy" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const { products } = useProducts();

  const items = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat, products],
  );

  return (
    <SiteLayout>
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Our catalog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">Products & medicines</h1>
          <p className="mt-3 text-muted-foreground">Search our shelves — request anything not listed via WhatsApp.</p>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines, supplements…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-11 h-12 rounded-full bg-card border-border/60"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === c
                    ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden border border-border/60 bg-card shadow-card hover:shadow-glow transition-shadow"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-secondary to-accent/40">
                {p.image ? (
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-6xl">
                    <span className="transition-transform group-hover:scale-110">{p.emoji}</span>
                  </div>
                )}
                <Badge
                  className={`absolute top-3 right-3 rounded-full ${
                    p.available
                      ? "bg-primary/10 text-primary hover:bg-primary/10"
                      : "bg-destructive/10 text-destructive hover:bg-destructive/10"
                  }`}
                >
                  {p.available ? "In stock" : "Out of stock"}
                </Badge>
              </div>
              <div className="p-5">
                <div className="text-xs text-primary font-semibold">{p.category}</div>
                <h3 className="mt-1 font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <Button asChild size="sm" className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-primary-glow">
                  <a href={waLink(`Hi! I'd like to order ${p.name}.`)} target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No products match your search. Try a different keyword or category.
            </div>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}
