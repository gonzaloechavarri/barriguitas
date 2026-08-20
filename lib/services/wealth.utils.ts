export type StrategyTarget = {
  acwi: number;
  oro: number;
  nasdaq: number;
};

export function calculateDeviationFromCurrent(
  current: StrategyTarget,
  target: StrategyTarget,
): number {
  return Math.max(
    Math.abs(current.acwi - target.acwi),
    Math.abs(current.oro - target.oro),
    Math.abs(current.nasdaq - target.nasdaq),
  );
}
