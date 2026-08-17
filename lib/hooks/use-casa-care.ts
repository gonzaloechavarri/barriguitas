"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "barriguitas:casa";
const UPDATED_FEEDBACK_MS = 1000;

type CasaStorage = {
  limpiezaExteriorCompletedAt: string;
};

export type CasaCareFeedback = "idle" | "updated";

function getDefaultCompletedAt(defaultDaysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - defaultDaysAgo);
  return date;
}

function readStoredCompletedAt(defaultDaysAgo: number): Date {
  if (typeof window === "undefined") {
    return getDefaultCompletedAt(defaultDaysAgo);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCompletedAt(defaultDaysAgo);

    const parsed = JSON.parse(raw) as CasaStorage;
    if (!parsed.limpiezaExteriorCompletedAt) {
      return getDefaultCompletedAt(defaultDaysAgo);
    }

    return new Date(parsed.limpiezaExteriorCompletedAt);
  } catch {
    return getDefaultCompletedAt(defaultDaysAgo);
  }
}

function persistCompletedAt(date: Date): void {
  const payload: CasaStorage = {
    limpiezaExteriorCompletedAt: date.toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function useCasaCare(defaultDaysAgo: number) {
  const [completedAt, setCompletedAt] = useState(() =>
    readStoredCompletedAt(defaultDaysAgo),
  );
  const [feedback, setFeedback] = useState<CasaCareFeedback>("idle");
  const [, setTick] = useState(0);

  useEffect(() => {
    setCompletedAt(readStoredCompletedAt(defaultDaysAgo));
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
