import {
  adjustStrategyAllocation,
  canDecreaseAllocation,
  canIncreaseAllocation,
  isValidDistributionSum,
  pickAllocationDonorKey,
  pickAllocationRecipientKey,
  sumStrategyDistribution,
} from "../lib/services/wealth-allocation.service.ts";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const base = { acwi: 80, oro: 20, nasdaq: 0 };

assert(sumStrategyDistribution(base) === 100, "base sum should be 100");
assert(canDecreaseAllocation(base, "oro"), "− allowed on oro at 20%");
assert(canIncreaseAllocation(base, "oro"), "+ allowed on oro when acwi can donate");

const firstDecrease = adjustStrategyAllocation(base, "oro", -1);
assert(firstDecrease !== null, "first − step should apply");
assert(firstDecrease.oro === 19, "oro should decrease to 19%");
assert(isValidDistributionSum(firstDecrease), "total stays at 100%");
assert(canDecreaseAllocation(firstDecrease, "oro"), "− still allowed on same asset");

const secondDecrease = adjustStrategyAllocation(firstDecrease, "oro", -1);
assert(secondDecrease !== null, "second − step should apply");
assert(secondDecrease.oro === 18, "oro should decrease to 18%");
assert(isValidDistributionSum(secondDecrease), "total stays at 100% after repeat −");

const increase = adjustStrategyAllocation(base, "oro", 1);
assert(increase !== null, "+ step should apply");
assert(increase.oro === 21 && increase.acwi === 79, "donor should be the heaviest other asset");
assert(isValidDistributionSum(increase), "total stays at 100% after +");

assert(
  pickAllocationRecipientKey(base, "oro") === "nasdaq",
  "recipient should be the lightest other asset",
);
assert(
  pickAllocationDonorKey(base, "oro") === "acwi",
  "donor should be the heaviest other asset",
);

assert(!canDecreaseAllocation({ acwi: 0, oro: 50, nasdaq: 50 }, "acwi"), "− blocked at 0%");
assert(
  !canIncreaseAllocation({ acwi: 100, oro: 0, nasdaq: 0 }, "acwi"),
  "+ blocked when no donor exists",
);

console.log("wealth allocation stepper checks passed");
