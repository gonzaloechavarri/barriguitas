"use client";

import { useEffect, useState } from "react";
import type { HoyWeatherPayload } from "@/lib/services/hoy-weather.types";

export function HoyWeatherContext() {
  const [weather, setWeather] = useState<HoyWeatherPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const response = await fetch("/api/hoy-weather");
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as HoyWeatherPayload;
        if (!cancelled && payload.locations.length > 0) {
          setWeather(payload);
        }
      } catch {
        // Sin tiempo disponible — Hoy sigue funcionando con normalidad.
      }
    }

    void loadWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather || weather.locations.length === 0) {
    return null;
  }

  return (
    <div className="mt-2.5 sm:mt-3">
      <div className="flex flex-col gap-1">
        {weather.locations.map((location) => (
          <p
            key={location.label}
            className="text-[0.8125rem] font-light tabular-nums tracking-[-0.01em] text-white/26 sm:text-sm"
          >
            <span aria-hidden className="mr-1.5">
              {location.icon}
            </span>
            <span className="inline-block min-w-[4.75rem]">{location.label}</span>
            <span aria-hidden className="mx-1.5 text-white/18">
              ·
            </span>
            <span className="text-white/34">
              {location.temperature ?? "—"}
            </span>
          </p>
        ))}
      </div>

      {weather.sourceLine ? (
        <p className="mt-1.5 text-[0.6875rem] font-light tracking-[-0.01em] text-white/16">
          {weather.sourceLine}
        </p>
      ) : null}
    </div>
  );
}
