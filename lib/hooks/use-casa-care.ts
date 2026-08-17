"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDefaultCleaningDate,
  getLastCleaningDate,
} from "@/lib/services/casa.service";

const STORAGE_KEY = "barriguitas:casa";
const UPDATED_FEEDBACK_MS = 1000;

type CasaStorage = {
  limpiezaExteriorCompletedAt: string;
};

export type CasaCareFeedback = "idle" | "updated";

export function useCasaCare(defaultDaysAgo: number) {
  const [completedAt, setCompletedAt] = useState(() =>
    getDefaultCleaningDate(defaultDaysAgo),
  );
  const [feedback, setFeedback] = useState<CasaCareFeedback>("idle");
  const [, setTick] = useState(0);

  useEffect(() => {
    setCompletedAt(getLastCleaningDate(defaultDaysAgo));
  }, [defaultDaysAgo]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  const markLimpiezaExteriorDone = useCallback(() => {
    const now = new Date();
    setCompletedAt(now);
    persistCompletedAt(now);
    setFeedback("updated");

    window.setTimeout(() => {
      setFeedback("idle");
    }, UPDATED_FEEDBACK_MS);
  }, []);

  return {
    completedAt,
    feedback,
    markLimpiezaExteriorDone,
  };
}

function persistCompletedAt(date: Date): void {
  const payload: CasaStorage = {
    limpiezaExteriorCompletedAt: date.toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
