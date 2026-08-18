"use client";

import { useSyncExternalStore } from "react";
import {
  getBarriguitasSnapshot,
<<<<<<< Updated upstream
  getServerBarriguitasSnapshot,
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
  persistBarriguitasSnapshot,
} from "./snapshot";
<<<<<<< Updated upstream
import { SERVER_SNAPSHOT } from "./types";
import type { BarriguitasSnapshot } from "./types";
=======
import { createDefaultSnapshot, type BarriguitasSnapshot } from "./types";
=======
  getServerBarriguitasSnapshot,
  persistBarriguitasSnapshot,
} from "./snapshot";
import { SERVER_SNAPSHOT } from "./types";
import type { BarriguitasSnapshot } from "./types";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

type Listener = () => void;

let version = 0;
const listeners = new Set<Listener>();

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
function emitChange() {
=======
>>>>>>> Stashed changes
function getServerSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}

export function notifyBarriguitasStoreChange(): void {
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  notifyBarriguitasStoreChange();
}

function getSnapshotVersion(): number {
=======
<<<<<<< HEAD
  emitChange();
}

function getVersion(): number {
=======
  notifyBarriguitasStoreChange();
}

function getSnapshotVersion(): number {
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  return version;
}

export function useBarriguitasStore(): BarriguitasSnapshot {
  return useSyncExternalStore(
    subscribeBarriguitas,
    getBarriguitasSnapshot,
<<<<<<< Updated upstream
    getServerSnapshot,
=======
<<<<<<< HEAD
    createDefaultSnapshot,
=======
    getServerSnapshot,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  );
}

export function useBarriguitasVersion(): number {
  return useSyncExternalStore(
    subscribeBarriguitas,
<<<<<<< Updated upstream
    getSnapshotVersion,
=======
<<<<<<< HEAD
    getVersion,
=======
    getSnapshotVersion,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
    () => 0,
  );
}

<<<<<<< Updated upstream
export { getServerBarriguitasSnapshot, getServerSnapshot };
=======
<<<<<<< HEAD
// Keep snapshot module in sync when hydrating on the client.
if (typeof window !== "undefined") {
  setBarriguitasSnapshot(getBarriguitasSnapshot());
}
=======
export { getServerBarriguitasSnapshot, getServerSnapshot };
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
