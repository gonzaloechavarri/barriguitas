import { getBarriguitasSnapshot } from "@/lib/data/store/snapshot";
import { createDefaultSnapshot } from "@/lib/data/store/types";

export function getAppData() {
  return getBarriguitasSnapshot().app;
}

export function getCoupleData() {
  return getBarriguitasSnapshot().couple;
}

export function getHouseData() {
  return getBarriguitasSnapshot().house;
}

export function getWealthData() {
  return getBarriguitasSnapshot().wealth;
}

export function getListsData() {
  return getBarriguitasSnapshot().lists;
}

export function getDefaultSnapshot() {
  return createDefaultSnapshot();
}
