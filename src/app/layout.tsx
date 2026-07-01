import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";

export const metadata: Metadata = {
  title:
    "Reddy Pharma | Medical Shop in Bengaluru | Medicine Home Delivery",
  description:
    "Reddy Pharma is a trusted medical shop in Bengaluru offering prescription medicines, OTC medicines, healthcare products and home delivery services.",
  keywords: [
    "Medical Shop Bengaluru",
    "Pharmacy Bengaluru",
    "Medicine Delivery Bengaluru",
    "Prescription Medicines Bengaluru",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

const pharmacySchema = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: "Reddy Pharma",
  url: "https://reddypharma.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pharmacySchema),
          }}
        />

        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}