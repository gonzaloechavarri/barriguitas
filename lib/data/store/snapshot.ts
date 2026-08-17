import { extractOverrides, mergeSnapshot } from "./merge";
import { readOverrides, writeOverrides } from "./storage";
import {
  createDefaultSnapshot,
  type BarriguitasSnapshot,
} from "./types";

/** Snapshot estable para SSR — React exige la misma referencia en cada llamada. */
const SERVER_SNAPSHOT = createDefaultSnapshot();

let snapshot: BarriguitasSnapshot = SERVER_SNAPSHOT;
let hydrated = false;

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  return snapshot;
}

export function getServerBarriguitasSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}

export function hydrateBarriguitasSnapshot(): boolean {
  if (typeof window === "undefined" || hydrated) {
    return false;
  }

  hydrated = true;

  const next = mergeSnapshot(readOverrides(), SERVER_SNAPSHOT);

  if (Object.is(next, snapshot)) {
    return false;
  }

  snapshot = next;
  return true;
}

export function persistBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;

  if (typeof window !== "undefined") {
    writeOverrides(extractOverrides(next));
  }
}
