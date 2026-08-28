import {
  adjustStrategyAllocation,
  canDecreaseAllocation,
  canIncreaseAllocation,
  isValidDistributionSum,
  sumStrategyDistribution,
} from "../lib/services/wealth-allocation.service.ts";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const base = { acwi: 85, oro: 10, nasdaq: 5 };

assert(sumStrategyDistribution(base) === 100, "base sum should be 100");
assert(!canIncreaseAllocation(base), "+ blocked at 100% total");
assert(canDecreaseAllocation(base, "oro"), "− allowed at 100% when asset > 0");

const afterDecrease = adjustStrategyAllocation(base, "oro", -1);
assert(afterDecrease !== null, "− step should apply");
assert(afterDecrease.oro === 9, "oro should decrease by 1");
assert(sumStrategyDistribution(afterDecrease) === 99, "intermediate total is 99");
assert(!isValidDistributionSum(afterDecrease), "99% should not persist");

assert(!canDecreaseAllocation(afterDecrease, "oro"), "− blocked below 100% total");
assert(canIncreaseAllocation(afterDecrease), "+ allowed below 100% total");

const rebalanced = adjustStrategyAllocation(afterDecrease, "acwi", 1);
assert(rebalanced !== null, "+ step should apply");
assert(rebalanced.acwi === 86 && rebalanced.oro === 9, "rebalanced values");
assert(isValidDistributionSum(rebalanced), "returns to 100%");

assert(
  adjustStrategyAllocation(base, "acwi", 1) === null,
  "+ blocked when total is already 100%",
);

assert(
  adjustStrategyAllocation({ acwi: 0, oro: 50, nasdaq: 50 }, "acwi", -1) === null,
  "− blocked when asset is 0",
);

console.log("wealth allocation stepper checks passed");
