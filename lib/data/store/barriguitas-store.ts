"use client";

import { useSyncExternalStore } from "react";
import {
  getBarriguitasSnapshot,
  persistBarriguitasSnapshot,
  setBarriguitasSnapshot,
} from "./snapshot";
import { createDefaultSnapshot, type BarriguitasSnapshot } from "./types";

type Listener = () => void;

let version = 0;
const listeners = new Set<Listener>();

function emitChange() {
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
  emitChange();
}

function getVersion(): number {
  return version;
}

export function useBarriguitasStore(): BarriguitasSnapshot {
  return useSyncExternalStore(
    subscribeBarriguitas,
    getBarriguitasSnapshot,
    createDefaultSnapshot,
  );
}

export function useBarriguitasVersion(): number {
  return useSyncExternalStore(
    subscribeBarriguitas,
    getVersion,
    () => 0,
  );
}

// Keep snapshot module in sync when hydrating on the client.
if (typeof window !== "undefined") {
  setBarriguitasSnapshot(getBarriguitasSnapshot());
}
