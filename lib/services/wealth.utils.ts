export type AssetClass = "acwi" | "oro";

export type InternalHolding = {
  assetClass: AssetClass;
  value: number;
};

export type StrategyTarget = {
  acwi: number;
  oro: number;
};

export function calculateStrategyAllocation(
  holdings: InternalHolding[],
  target: StrategyTarget,
  deviationThreshold: number,
) {
  const totals = holdings.reduce(
    (acc, holding) => {
      acc[holding.assetClass] += holding.value;
      return acc;
    },
    { acwi: 0, oro: 0 },
  );

  const total = totals.acwi + totals.oro;
  const acwiPercentage = Math.round((totals.acwi / total) * 100);
  const oroPercentage = 100 - acwiPercentage;

  const maxDeviation = Math.max(
    Math.abs(acwiPercentage - target.acwi),
    Math.abs(oroPercentage - target.oro),
  );

  return {
    acwiPercentage,
    oroPercentage,
    isAligned: maxDeviation <= deviationThreshold,
    maxDeviation,
  };
}
