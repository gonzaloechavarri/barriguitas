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
      className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        weddingData ? "opacity-100" : "opacity-0"
      }`}
    >
      {weddingData ? <NosotrosView weddingData={weddingData} /> : null}
    </div>
  );
}
