import { extractOverrides, mergeSnapshot } from "./merge";
import { readOverrides, writeOverrides } from "./storage";
import {
  createDefaultSnapshot,
  type BarriguitasSnapshot,
} from "./types";

/** Snapshot estable para SSR — React exige la misma referencia en cada llamada. */
const SERVER_SNAPSHOT = createDefaultSnapshot();

let snapshot: BarriguitasSnapshot = SERVER_SNAPSHOT;

export function initBarriguitasSnapshot(): void {
  if (typeof window !== "undefined") {
    snapshot = mergeSnapshot(readOverrides());
  }
}

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  return snapshot;
}

export function getServerBarriguitasSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}

export function setBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;
}

export function persistBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;

  if (typeof window !== "undefined") {
    writeOverrides(extractOverrides(next));
  }
}

initBarriguitasSnapshot();
