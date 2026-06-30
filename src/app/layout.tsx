import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Reddy Pharmacy Elevate",
  description: "Premium pharmacy services and healthcare solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
