export type AssetClass = "acwi" | "oro" | "momentum";

export type InternalHolding = {
  assetClass: AssetClass;
  value: number;
};

export type StrategyTarget = {
  acwi: number;
  oro: number;
  momentum: number;
};

export function calculateDeviationFromCurrent(
  current: StrategyTarget,
  target: StrategyTarget,
): number {
  return Math.max(
    Math.abs(current.acwi - target.acwi),
    Math.abs(current.oro - target.oro),
    Math.abs(current.momentum - target.momentum),
  );
}

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
    { acwi: 0, oro: 0, momentum: 0 },
  );

  const total = totals.acwi + totals.oro + totals.momentum;
  const acwiPercentage = Math.round((totals.acwi / total) * 100);
  const oroPercentage = Math.round((totals.oro / total) * 100);
  const momentumPercentage = 100 - acwiPercentage - oroPercentage;

  const maxDeviation = Math.max(
    Math.abs(acwiPercentage - target.acwi),
    Math.abs(oroPercentage - target.oro),
    Math.abs(momentumPercentage - target.momentum),
  );

  return {
    acwiPercentage,
    oroPercentage,
    momentumPercentage,
    isAligned: maxDeviation <= deviationThreshold,
    maxDeviation,
  };
}
