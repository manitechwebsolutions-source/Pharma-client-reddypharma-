import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-transparent to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg">
            <img
              src="/assets/reddypharmalogo.png"
              alt="Reddy Pharma"
              className="h-12 w-auto rounded-xl object-contain"
            />
            {SITE.name}
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Genuine medicines, fast home delivery, and trusted care for families in Bengaluru.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link href="/request" className="hover:text-primary">
                Request Medicine
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Medicines</li>
            <li>Health Supplements</li>
            <li>Personal Care</li>
            <li>Baby Care</li>
            <li>Medical Equipment</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {SITE.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved. built by{" "}
        <a
          href="https://www.webpagixsolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          webpagixsolutions
        </a>
      </div>
    </footer>
  );
}
