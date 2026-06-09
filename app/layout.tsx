import type { Metadata } from "next";
import { Suspense } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteProgress } from "@/components/shared/RouteProgress";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MICRO — Build. Hire. Pay. On-Chain.",
    template: "%s | MICRO",
  },
  description:
    "A decentralized marketplace on Stellar. AI-powered matching, smart contract escrow, real-time dashboards. Built for Web3 freelancers, agencies, and clients.",
  keywords: [
    "stellar",
    "marketplace",
    "web3",
    "freelance",
    "smart contract",
    "soroban",
    "crypto",
    "blockchain",
    "escrow",
  ],
  openGraph: {
    title: "MICRO",
    description: "Build. Hire. Pay. All on-chain via Stellar.",
    siteName: "MICRO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans antialiased">
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}