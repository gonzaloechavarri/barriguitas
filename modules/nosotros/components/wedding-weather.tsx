"use client";

import { useEffect, useState } from "react";
import type { WeddingWeatherPayload } from "@/lib/services/wedding-weather.types";

type WeddingWeatherProps = {
  locationName: string;
};

export function WeddingWeather({ locationName }: WeddingWeatherProps) {
  const [weather, setWeather] = useState<WeddingWeatherPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const response = await fetch("/api/wedding-weather");
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as WeddingWeatherPayload;
        if (!cancelled) {
          setWeather(payload);
        }
      } catch {
        if (!cancelled) {
          setWeather(null);
        }
      }
    }

    void loadWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather) {
    return null;
  }

  const showLocation =
    weather.phase === "forecast" ||
    weather.phase === "wedding-day" ||
    weather.phase === "unavailable";

  return (
    <div className="mt-7 border-t border-white/[0.05] pt-6 sm:mt-8">
      {weather.phase === "wedding-day" ? (
        <p className="text-[0.9375rem] font-light tracking-[-0.01em] text-white/62">
          <span aria-hidden className="mr-1.5">
            💍
          </span>
          {weather.primaryLine}
        </p>
      ) : (
        <p className="text-[0.875rem] font-light tracking-[-0.01em] text-white/38">
          <span aria-hidden className="mr-1.5">
            🌤️
          </span>
          {weather.primaryLine}
        </p>
      )}

      {weather.secondaryLine ? (
        <p
          className={`mt-2 font-light tracking-[-0.01em] ${
            weather.phase === "wedding-day"
              ? "text-[0.9375rem] text-white/52"
              : "text-[0.8125rem] text-white/30"
          }`}
        >
          {weather.secondaryLine}
        </p>
      ) : null}

      {weather.detailLine && weather.phase !== "wedding-day" ? (
        <p className="mt-1 text-[0.8125rem] font-light tracking-[-0.01em] text-white/26">
          {weather.detailLine}
        </p>
      ) : null}

      {showLocation ? (
        <p className="mt-2.5 text-[0.75rem] font-light tracking-[-0.01em] text-white/22">
          {locationName}
          {weather.sourceLine ? ` · ${weather.sourceLine}` : null}
        </p>
      ) : weather.phase === "distant" || weather.phase === "approaching" ? (
        <p className="mt-2.5 text-[0.75rem] font-light tracking-[-0.01em] text-white/20">
          {locationName}
        </p>
      ) : null}
    </div>
  );
}
