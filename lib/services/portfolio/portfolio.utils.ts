import type { PricePoint } from "@/lib/services/market-data/types";

export function getCloseOnOrBefore(
  prices: PricePoint[],
  date: Date,
): number | null {
  let closest: PricePoint | null = null;

  for (const point of prices) {
    if (point.date.getTime() <= date.getTime()) {
      closest = point;
      continue;
    }
    break;
  }

  return closest?.close ?? null;
}

export function getLastPricePoint(prices: PricePoint[]): PricePoint | null {
  return prices.length > 0 ? prices[prices.length - 1] : null;
}

/**
 * Variación entre el último cierre disponible y el cierre anterior en el histórico.
 */
export function calculateLastSessionReturn(
  prices: PricePoint[],
): number | null {
  if (prices.length < 2) return null;

  const last = prices[prices.length - 1];
  const previous = prices[prices.length - 2];

  if (previous.close === 0) return null;

  return last.close / previous.close - 1;
}

/**
 * Rentabilidad entre el cierre en o antes de startDate y el último cierre disponible.
 */
export function calculateAssetReturn(
  prices: PricePoint[],
  startDate: Date,
  endDate: Date,
): number | null {
  const startPrice = getCloseOnOrBefore(prices, startDate);
  const endPrice = getCloseOnOrBefore(prices, endDate);

  if (!startPrice || !endPrice || startPrice === 0) return null;
  if (endPrice === startPrice) return 0;

  return endPrice / startPrice - 1;
}

export function calculateWeightedReturn(
  acwiWeight: number,
  oroWeight: number,
  acwiReturn: number | null,
  oroReturn: number | null,
): number | null {
  if (acwiReturn === null || oroReturn === null) return null;

  return (acwiWeight / 100) * acwiReturn + (oroWeight / 100) * oroReturn;
}

export function alignReferenceEndDate(
  acwiPrices: PricePoint[],
  oroPrices: PricePoint[],
): Date | null {
  const acwiLast = getLastPricePoint(acwiPrices);
  const oroLast = getLastPricePoint(oroPrices);

  if (!acwiLast || !oroLast) return null;

  return acwiLast.date < oroLast.date ? acwiLast.date : oroLast.date;
}

export function formatPerformanceChange(value: number): string {
  const percentage = value * 100;
  const sign = percentage >= 0 ? "+" : "−";
  const formatted = Math.abs(percentage).toFixed(2).replace(".", ",");

  return `${sign}${formatted} %`;
}

export function formatPerformanceUnavailable(): string {
  return "—";
}

export function formatDeviation(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} %`;
}
