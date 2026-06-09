"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Neon-style top progress bar that animates on route changes.
 * Attaches to Next.js navigation events and renders a glowing
 * progress line at the top of the viewport.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);

    // Simulate progress with a trickle effect
    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 15;
      if (p > 85) p = 85; // hold at 85% until route actually changes
      setProgress(p);
    }, 200);
  }, []);

  const finishLoading = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Jump to 100% and fade out
    setProgress(100);
    const timeout = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  // Trigger progress on route change
  useEffect(() => {
    startLoading();
    const finish = finishLoading;
    // Slight delay to let the page begin rendering
    const timeout = setTimeout(finish, 500);
    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00ff88, #00d4ff)",
          boxShadow: "0 0 8px #00ff8866, 0 0 16px #00ff8833",
        }}
      />
    </div>
  );
}