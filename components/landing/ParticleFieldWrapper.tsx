"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () =>
    import("./ParticleField").then((mod) => ({ default: mod.ParticleField })),
  { ssr: false, loading: () => null },
);

export function ParticleFieldWrapper() {
  return <ParticleField />;
}