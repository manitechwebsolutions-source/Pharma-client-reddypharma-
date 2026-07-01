import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Reddy Pharma | Medical Shop in Bengaluru | Medicine Home Delivery",
  description: "Reddy Pharma is a trusted medical shop in Bengaluru offering prescription medicines, OTC medicines, healthcare products and home delivery services.",
   keywords: [
    "Medical Shop Bengaluru",
    "Pharmacy Bengaluru",
    "Medicine Delivery Bengaluru",
    "Prescription Medicines Bengaluru",
    "Healthcare Products Bengaluru",
  ],
  openGraph: {
    title: "Reddy Pharma",
    description:
      "Trusted medical shop in Bengaluru with medicine delivery.",
    url: "https://reddypharma.in/",
    siteName: "Reddy Pharma",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};
const pharmacySchema = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: "Reddy Pharma",
  url: "https://reddypharma.in/",
  image: "https://reddypharma.in/favicon.ico",
  telephone: "+91 9502755997 ", // Replace
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: "Bengaluru",
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
