"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Browse",
    description:
      "Search the marketplace for top Web3 talent. Filter by skillset, budget, and verified Stellar activity.",
  },
  {
    number: "02",
    title: "Hire",
    description:
      "Review company profiles, check on-chain work history, and send a hire request. Smart contracts handle the rest.",
  },
  {
    number: "03",
    title: "Pay on Stellar",
    description:
      "Funds held in Soroban escrow. Milestones released automatically. Every transaction verified and visible on-chain.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const stepEls = el.querySelectorAll<HTMLElement>(".how-step");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    stepEls.forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=60px",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-bg-secondary/50 border-y border-border-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-mono text-2xl font-bold sm:text-3xl">
            How It <span className="text-cyan neon-text-cyan">Works</span>
          </h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded-full bg-cyan/50" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={step.number} className="how-step relative">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border-glow"
                  aria-hidden="true"
                />
              )}

              <div className="text-center">
                <span className="inline-flex items-center justify-center h-16 w-16 rounded-full border border-neon/30 bg-bg-tertiary font-mono text-xl font-bold text-neon neon-text">
                  {step.number}
                </span>
                <h3 className="mt-4 font-mono text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Remotion video placeholder — Task 13 */}
        <div className="mt-16 mx-auto max-w-3xl">
          <div className="relative aspect-video rounded-xl border border-border-primary bg-bg-tertiary overflow-hidden scanlines">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="h-12 w-12 text-neon/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              <p className="text-text-muted text-sm font-mono">
                How It Works <span className="text-neon/50">— Remotion Video</span>
              </p>
              <p className="text-text-muted/60 text-xs mt-1">Coming in Task 13</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}