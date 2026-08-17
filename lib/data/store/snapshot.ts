import { extractOverrides, mergeSnapshot } from "./merge";
import { readOverrides, writeOverrides } from "./storage";
import {
  createDefaultSnapshot,
  type BarriguitasSnapshot,
} from "./types";

let snapshot: BarriguitasSnapshot = createDefaultSnapshot();

export function initBarriguitasSnapshot(): void {
  if (typeof window !== "undefined") {
    snapshot = mergeSnapshot(readOverrides());
  }
}

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  return snapshot;
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
