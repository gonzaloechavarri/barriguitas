"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { resolveCleaningDate } from "@/lib/data/utils/dates";
import { registerCleaning as registerCleaningInStore } from "@/lib/services/settings.service";

const UPDATED_FEEDBACK_MS = 1000;

export type CasaCareFeedback = "idle" | "updated";

export function useCasaCare() {
  const house = useBarriguitasStore().house;
  const [feedback, setFeedback] = useState<CasaCareFeedback>("idle");
  const [, setTick] = useState(0);

  const completedAt = useMemo(
    () =>
      resolveCleaningDate(
        house.cuidado.lastCleaningAt,
        house.cuidado.defaultDaysAgo,
      ),
    [house.cuidado.defaultDaysAgo, house.cuidado.lastCleaningAt],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  const markLimpiezaExteriorDone = useCallback(() => {
    registerCleaningInStore();
    setFeedback("updated");

    window.setTimeout(() => {
      setFeedback("idle");
    }, UPDATED_FEEDBACK_MS);
  }, []);

  return {
    cuidado: house.cuidado,
    nuevoHogar: house.nuevoHogar,
    mantenimiento: house.mantenimiento,
    completedAt,
    feedback,
    markLimpiezaExteriorDone,
  };
}
