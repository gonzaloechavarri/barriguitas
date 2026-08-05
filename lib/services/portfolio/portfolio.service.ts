import "server-only";

import { getFamilyConfig } from "@/lib/data/providers/local";
import {
  calculateStrategyAllocation,
  type InternalHolding,
} from "@/lib/services/wealth.utils";
import { getPortfolioAssetHistories } from "@/lib/services/market-data/market-data.service";
import type { PricePoint } from "@/lib/services/market-data/types";
import {
  alignReferenceEndDate,
  calculateAssetReturn,
  calculateLastSessionReturn,
  calculateWeightedReturn,
  formatDeviation,
  formatPerformanceChange,
  formatPerformanceUnavailable,
} from "./portfolio.utils";

export type PortfolioSnapshot = {
  weights: { acwi: number; oro: number };
  maxDeviation: number;
  isAligned: boolean;
  performance: {
    lastSession: string;
    days30: string;
    yearToDate: string;
    fiveYears: string;
  };
};

function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function subtractYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() - years);
  return result;
}

function lastCloseOfPreviousYear(date: Date): Date {
  return new Date(date.getFullYear() - 1, 11, 31);
}

function formatReturn(value: number | null): string {
  if (value === null) {
    return formatPerformanceUnavailable();
  }

  return formatPerformanceChange(value);
}

function computeLastSessionReturn(
  acwiWeight: number,
  oroWeight: number,
  acwiPrices: PricePoint[],
  oroPrices: PricePoint[],
): number | null {
  return calculateWeightedReturn(
    acwiWeight,
    oroWeight,
    calculateLastSessionReturn(acwiPrices),
    calculateLastSessionReturn(oroPrices),
  );
}

async function resolveLastSessionReturn(
  acwiWeight: number,
  oroWeight: number,
  referenceDate: Date,
  acwiPrices?: PricePoint[],
  oroPrices?: PricePoint[],
): Promise<number | null> {
  if (acwiPrices && oroPrices) {
    const fromMainHistory = computeLastSessionReturn(
      acwiWeight,
      oroWeight,
      acwiPrices,
      oroPrices,
    );

    if (fromMainHistory !== null) {
      return fromMainHistory;
    }
  }

  const recentFrom = subtractDays(referenceDate, 14);
  const recentHistories = await getPortfolioAssetHistories(
    recentFrom,
    referenceDate,
  );

  return computeLastSessionReturn(
    acwiWeight,
    oroWeight,
    recentHistories.acwi.prices,
    recentHistories.oro.prices,
  );
}

function hasMinimumHistory(
  startDate: Date,
  endDate: Date,
  minimumYears: number,
): boolean {
  const minimumMs = minimumYears * 365.25 * 86_400_000;
  return endDate.getTime() - startDate.getTime() >= minimumMs * 0.95;
}

export async function getPortfolioSnapshot(
  referenceDate: Date = new Date(),
): Promise<PortfolioSnapshot> {
  const config = getFamilyConfig();
  const { patrimonio } = config;
  const holdings: InternalHolding[] = patrimonio.holdings.map((holding) => ({
    assetClass: holding.assetClass,
    value: holding.value,
  }));

  const allocation = calculateStrategyAllocation(
    holdings,
    patrimonio.strategy.target,
    patrimonio.strategy.deviationThreshold,
  );

  const { acwiPercentage, oroPercentage, maxDeviation, isAligned } = allocation;

  let lastSessionReturn: number | null = null;
  let days30Return: number | null = null;
  let ytdReturn: number | null = null;
  let fiveYearsReturn: number | null = null;

  let acwiPrices: PricePoint[] | undefined;
  let oroPrices: PricePoint[] | undefined;

  try {
    const lookbackYears = patrimonio.performanceLookbackYears;
    const fetchFrom = subtractDays(subtractYears(referenceDate, lookbackYears), 14);

    const histories = await getPortfolioAssetHistories(fetchFrom, referenceDate);
    acwiPrices = histories.acwi.prices;
    oroPrices = histories.oro.prices;

    const referenceEnd = alignReferenceEndDate(acwiPrices, oroPrices);

    if (referenceEnd) {
      const days30Start = subtractDays(referenceEnd, 30);
      days30Return = calculateWeightedReturn(
        acwiPercentage,
        oroPercentage,
        calculateAssetReturn(acwiPrices, days30Start, referenceEnd),
        calculateAssetReturn(oroPrices, days30Start, referenceEnd),
      );

      const ytdStart = lastCloseOfPreviousYear(referenceEnd);
      ytdReturn = calculateWeightedReturn(
        acwiPercentage,
        oroPercentage,
        calculateAssetReturn(acwiPrices, ytdStart, referenceEnd),
        calculateAssetReturn(oroPrices, ytdStart, referenceEnd),
      );

      const fiveYearsStart = subtractYears(referenceEnd, lookbackYears);
      const acwiFiveYearReturn = calculateAssetReturn(
        acwiPrices,
        fiveYearsStart,
        referenceEnd,
      );
      const oroFiveYearReturn = calculateAssetReturn(
        oroPrices,
        fiveYearsStart,
        referenceEnd,
      );

      if (
        hasMinimumHistory(fiveYearsStart, referenceEnd, lookbackYears) &&
        acwiFiveYearReturn !== null &&
        oroFiveYearReturn !== null
      ) {
        fiveYearsReturn = calculateWeightedReturn(
          acwiPercentage,
          oroPercentage,
          acwiFiveYearReturn,
          oroFiveYearReturn,
        );
      }
    }
  } catch {
    // El histórico largo puede fallar; la última sesión se resuelve aparte.
  }

  try {
    lastSessionReturn = await resolveLastSessionReturn(
      acwiPercentage,
      oroPercentage,
      referenceDate,
      acwiPrices,
      oroPrices,
    );
  } catch {
    // Sin histórico reciente no hay rentabilidad de última sesión.
  }

  return {
    weights: { acwi: acwiPercentage, oro: oroPercentage },
    maxDeviation,
    isAligned,
    performance: {
      lastSession: formatReturn(lastSessionReturn),
      days30: formatReturn(days30Return),
      yearToDate: formatReturn(ytdReturn),
      fiveYears: formatReturn(fiveYearsReturn),
    },
  };
}

export function formatPortfolioDeviation(maxDeviation: number): string {
  return formatDeviation(maxDeviation);
}
