"use client";

import { useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { getWeddingData } from "@/lib/services";
import { NosotrosView } from "./nosotros-view";

export function NosotrosModule() {
  const snapshot = useBarriguitasStore();
  const weddingData = useMemo(() => getWeddingData(), [snapshot]);

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <NosotrosView weddingData={weddingData} />
    </div>
  );
}
