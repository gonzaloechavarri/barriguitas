import { extractOverrides, mergeSnapshot } from "./merge";
import { readOverrides, writeOverrides } from "./storage";
import { SERVER_SNAPSHOT, type BarriguitasSnapshot } from "./types";

let snapshot: BarriguitasSnapshot = SERVER_SNAPSHOT;
let hydrated = false;

export { SERVER_SNAPSHOT };

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  if (!hydrated) {
    return SERVER_SNAPSHOT;
  }

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

  const next = mergeSnapshot(readOverrides());
  snapshot = next;
  return !Object.is(next, SERVER_SNAPSHOT);
}

export function persistBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;
  hydrated = true;

  if (typeof window !== "undefined") {
    writeOverrides(extractOverrides(next));
  }
}
