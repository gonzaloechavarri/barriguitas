import "server-only";

import { getPortfolioPerformance } from "@/lib/services/portfolio/portfolio.service";
import { buildWealthView } from "@/lib/services/wealth-view.service";

export async function getWealthView() {
  const performance = await getPortfolioPerformance();
  return buildWealthView(performance);
}

/** @deprecated Usar getWealthView. */
export async function getWealthSummary() {
  return getWealthView();
}
