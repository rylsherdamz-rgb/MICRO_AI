import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-glow bg-bg-secondary/50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="font-mono text-lg font-bold tracking-tight">
              <span className="text-text-primary">MICRO</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xs">
              The decentralized marketplace for Web3 talent. Built on Stellar, powered by AI.
            </p>
          </div>

          {/* Marketplace links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              Marketplace
            </h3>
            <nav aria-label="Marketplace links" className="mt-4 space-y-2">
              <Link href="/explore" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Explore
              </Link>
              <Link href="/projects" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Projects
              </Link>
              <Link href="/transactions" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Transactions
              </Link>
            </nav>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              Resources
            </h3>
            <nav aria-label="Resource links" className="mt-4 space-y-2">
              <Link href="/about" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                About
              </Link>
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Stellar.org
              </a>
              <a href="https://developers.stellar.org" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Developer Docs
              </a>
            </nav>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              Company
            </h3>
            <nav aria-label="Company links" className="mt-4 space-y-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Twitter / X
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon transition-colors">
                Discord
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-primary flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} MICRO. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neon/20 bg-neon/5 px-3 py-1 text-xs font-mono text-neon/70">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Powered by Stellar
          </span>
        </div>
      </div>
    </footer>
  );
}