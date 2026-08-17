import "server-only";

import { getWealthData } from "@/lib/data/providers/local";
import type { AssetHistory } from "./types";
import { fetchHistoricalPrices } from "./providers/yahoo.provider";

/**
 * Obtiene precios históricos por ISIN.
 * La interfaz no expone el proveedor subyacente.
 */
export async function getAssetHistory(
  isin: string,
  from: Date,
  to: Date = new Date(),
): Promise<AssetHistory> {
  const { marketAssets } = getWealthData();
  const asset =
    marketAssets.acwi.isin === isin
      ? marketAssets.acwi
      : marketAssets.oro;

  if (asset.isin !== isin) {
    throw new Error(`Activo desconocido: ${isin}`);
  }

  const prices = await fetchHistoricalPrices(asset.yahooSymbol, from, to);

  return { isin, prices };
}

export async function getPortfolioAssetHistories(
  from: Date,
  to: Date = new Date(),
): Promise<{ acwi: AssetHistory; oro: AssetHistory }> {
  const { marketAssets } = getWealthData();
  const { acwi, oro } = marketAssets;

  const [acwiHistory, oroHistory] = await Promise.all([
    getAssetHistory(acwi.isin, from, to),
    getAssetHistory(oro.isin, from, to),
  ]);

  return { acwi: acwiHistory, oro: oroHistory };
}
