import "server-only";

import YahooFinance from "yahoo-finance2";
import type { PricePoint } from "../types";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export async function fetchHistoricalPrices(
  symbol: string,
  from: Date,
  to: Date,
): Promise<PricePoint[]> {
  const result = await yahooFinance.chart(symbol, {
    period1: from,
    period2: to,
    interval: "1d",
  });

  return result.quotes
    .filter((row): row is typeof row & { close: number } => row.close != null)
    .map((row) => ({
      date: row.date,
      close: row.close,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
