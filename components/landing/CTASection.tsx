import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-neon/20 bg-gradient-to-b from-bg-secondary to-bg-tertiary p-10 sm:p-16 glow-border">
          <h2 className="font-mono text-2xl font-bold sm:text-3xl lg:text-4xl">
            Ready to Build on{" "}
            <span className="text-neon neon-text">MICRO</span>?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary leading-relaxed">
            Join the marketplace that puts trust on-chain. Whether you&apos;re
            hiring talent or offering your skills, MICRO makes
            every transaction transparent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-neon px-8 text-sm font-semibold text-bg-primary hover:bg-neon-dim transition-colors focus:outline-none focus:ring-2 focus:ring-neon/50 glow-border"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-neon/30 bg-transparent px-8 text-sm font-semibold text-neon hover:bg-neon/5 hover:border-neon/60 transition-all focus:outline-none focus:ring-2 focus:ring-neon/40"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}