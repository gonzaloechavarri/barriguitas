"use client";

import { useCallback } from "react";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { getWeddingData } from "@/lib/services";
import { NosotrosView } from "./nosotros-view";

export function NosotrosModule() {
  const loadWeddingData = useCallback(() => getWeddingData(), []);
  const weddingData = useAsyncData(loadWeddingData);

  return (
    <div
      className={`motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        weddingData ? "opacity-100" : "opacity-0"
      }`}
    >
      {weddingData ? <NosotrosView weddingData={weddingData} /> : null}
    </div>
  );
}
