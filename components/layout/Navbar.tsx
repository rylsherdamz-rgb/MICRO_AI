"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    address,
    isConnected,
    isLoading,
    error: _walletError,
    connect,
    disconnect,
  } = useWallet();

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-glow bg-bg-primary/80 backdrop-blur-md"
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 font-mono text-lg font-bold tracking-tight"
        >
          <span className="text-text-primary">MICRO</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex md:items-center md:gap-6 md:ml-8">
          <Link
            href="/explore"
            className="text-sm text-text-secondary hover:text-neon transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/projects"
            className="text-sm text-text-secondary hover:text-neon transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="text-sm text-text-secondary hover:text-neon transition-colors"
          >
            About
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div
          className={`${
            searchOpen ? "flex-1 sm:flex-none sm:w-64" : "w-8 sm:w-48"
          } transition-all duration-200`}
        >
          <label htmlFor="navbar-search" className="sr-only">
            Search companies and projects
          </label>
          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="navbar-search"
              type="search"
              placeholder={searchOpen ? "Search companies, projects..." : "Search..."}
              className="w-full rounded-lg border border-border-primary bg-bg-secondary py-1.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/30 transition-all"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Connect Wallet button */}
        {isConnected && address ? (
          <div className="flex-shrink-0 flex items-center gap-2 rounded-lg border border-neon/20 bg-bg-secondary px-3 py-1.5">
            <span
              className="flex-shrink-0 h-2 w-2 rounded-full bg-neon"
              aria-hidden="true"
            />
            <span className="text-sm font-mono text-neon/80">
              {formatAddress(address)}
            </span>
            <button
              type="button"
              onClick={disconnect}
              className="ml-1 text-xs text-text-muted hover:text-danger transition-colors"
              aria-label="Disconnect wallet"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={connect}
            disabled={isLoading}
            className="flex-shrink-0 rounded-lg border border-neon/30 bg-neon/5 px-4 py-2 text-sm font-medium text-neon hover:bg-neon/10 hover:border-neon/60 transition-all focus:outline-none focus:ring-2 focus:ring-neon/40 glow-border disabled:opacity-50 disabled:cursor-wait"
            aria-label="Connect Stellar wallet"
          >
            <span className="hidden sm:inline">
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </span>
            <span className="sm:hidden">
              {isLoading ? "..." : "Connect"}
            </span>
          </button>
        )}

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden flex-shrink-0 rounded-lg p-2 text-text-secondary hover:text-neon hover:bg-bg-secondary transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}