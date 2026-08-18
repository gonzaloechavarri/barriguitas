import "server-only";

import { buildWealthView } from "@/lib/services/wealth-view.service";

export function getWealthView() {
  return buildWealthView();
}

/** @deprecated Usar getWealthView. */
export function getWealthSummary() {
  return getWealthView();
}
