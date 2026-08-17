"use client";

import { useSyncExternalStore } from "react";
import type { FamilyConfig } from "@/config/family";
import {
  getBarriguitasSnapshot,
  getServerBarriguitasSnapshot,
  persistBarriguitasSnapshot,
} from "./snapshot";
import type { BarriguitasSnapshot } from "./types";

type Listener = () => void;

let version = 0;
const listeners = new Set<Listener>();

export function notifyBarriguitasStoreChange(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeBarriguitas(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function updateBarriguitas(
  updater: (current: BarriguitasSnapshot) => BarriguitasSnapshot,
): void {
  const next = updater(getBarriguitasSnapshot());
  persistBarriguitasSnapshot(next);
  notifyBarriguitasStoreChange();
}

function getSnapshotVersion(): number {
  return version;
}

export function useBarriguitasStore(): BarriguitasSnapshot {
  return useSyncExternalStore(
    subscribeBarriguitas,
    getBarriguitasSnapshot,
    getServerBarriguitasSnapshot,
  );
}

export function useFamilyConfig(): FamilyConfig {
  return useBarriguitasStore().config;
}

export function useBarriguitasVersion(): number {
  return useSyncExternalStore(
    subscribeBarriguitas,
    getSnapshotVersion,
    () => 0,
  );
}
