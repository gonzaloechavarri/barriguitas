import { extractOverrides, mergeSnapshot } from "./merge";
import { readOverrides, writeOverrides } from "./storage";
import {
<<<<<<< Updated upstream
  SERVER_SNAPSHOT,
=======
<<<<<<< HEAD
  createDefaultSnapshot,
>>>>>>> Stashed changes
  type BarriguitasSnapshot,
} from "./types";

let snapshot: BarriguitasSnapshot = SERVER_SNAPSHOT;
let hydrated = false;

export { SERVER_SNAPSHOT };

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  if (!hydrated) {
    return SERVER_SNAPSHOT;
  }

  return snapshot;
}

<<<<<<< Updated upstream
=======
export function setBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;
=======
  SERVER_SNAPSHOT,
  type BarriguitasSnapshot,
} from "./types";

let snapshot: BarriguitasSnapshot = SERVER_SNAPSHOT;
let hydrated = false;

export { SERVER_SNAPSHOT };

export function getBarriguitasSnapshot(): BarriguitasSnapshot {
  if (!hydrated) {
    return SERVER_SNAPSHOT;
  }

  return snapshot;
}

>>>>>>> Stashed changes
export function getServerBarriguitasSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}

export function hydrateBarriguitasSnapshot(): boolean {
  if (typeof window === "undefined" || hydrated) {
    return false;
  }

  hydrated = true;
  snapshot = mergeSnapshot(readOverrides(), SERVER_SNAPSHOT);
  return !Object.is(snapshot, SERVER_SNAPSHOT);
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
}

export function persistBarriguitasSnapshot(next: BarriguitasSnapshot): void {
  snapshot = next;
<<<<<<< Updated upstream
  hydrated = true;
=======
<<<<<<< HEAD
=======
  hydrated = true;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

  if (typeof window !== "undefined") {
    writeOverrides(extractOverrides(next));
  }
}
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

initBarriguitasSnapshot();
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
