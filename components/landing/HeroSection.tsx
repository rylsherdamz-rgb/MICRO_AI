import Link from "next/link";
import { ParticleFieldWrapper } from "./ParticleFieldWrapper";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Three.js particle background — loaded client-side only */}
      <ParticleFieldWrapper />

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center py-20 sm:py-32">
        <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-text-primary">MICRO</span>
          <span className="block text-neon neon-text glitch-text">Marketplace</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-text-secondary">
          Build. Hire. Pay. All on-chain via{" "}
          <span className="text-cyan font-medium">Stellar</span>.
          AI-powered matching, smart contract escrow, and real-time dashboards
          for the next generation of Web3 work.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-neon px-8 text-sm font-semibold text-bg-primary hover:bg-neon-dim transition-colors focus:outline-none focus:ring-2 focus:ring-neon/50 glow-border"
          >
            Explore Marketplace
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-neon/30 bg-transparent px-8 text-sm font-semibold text-neon hover:bg-neon/5 hover:border-neon/60 transition-all focus:outline-none focus:ring-2 focus:ring-neon/40"
          >
            Join as Company
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-pulse-glow" aria-hidden="true">
          <svg
            className="mx-auto h-6 w-6 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}