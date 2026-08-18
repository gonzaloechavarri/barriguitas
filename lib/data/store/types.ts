import { appData, type AppData } from "@/data/app";
import { coupleData } from "@/data/couple";
import { houseData } from "@/data/house";
import { listsData } from "@/data/lists";
import { wealthData } from "@/data/wealth";
import type { MilestoneEntry, StrategyDistribution } from "@/lib/data/types/editable";
import type { BarriguitasListsData } from "@/lib/data/types/lists";

export type BarriguitasCoupleData = {
  wedding: {
    date: string;
    journeyStartDate: string;
    cardTitle: string;
    countdownLabel: string;
    progressMessage: string;
  };
  nextTrip: {
    cardTitle: string;
    destination: string;
    startDate: string;
  };
  milestones: MilestoneEntry[];
  copilot: (typeof coupleData)["copilot"];
  members: readonly string[];
};

export type BarriguitasHouseData = {
  cuidado: (typeof houseData)["cuidado"] & {
    lastCleaningAt: string | null;
  };
  nuevoHogar: (typeof houseData)["nuevoHogar"];
  mantenimiento: (typeof houseData)["mantenimiento"];
  menu: (typeof houseData)["menu"];
  copilot: (typeof houseData)["copilot"];
};

export type BarriguitasWealthData = {
  /** Vista de la cartera de inversión — no patrimonio neto ni activos no líquidos. */
  cardTitle: string;
  subtitle: string;
  performanceLookbackYears: number;
  marketAssets: (typeof wealthData)["marketAssets"];
  strategy: Omit<(typeof wealthData)["strategy"], "target"> & {
    target: StrategyDistribution;
  };
  currentDistribution: StrategyDistribution;
  holdings: (typeof wealthData)["holdings"];
  rebalancePhilosophy: (typeof wealthData)["rebalancePhilosophy"];
  copilot: (typeof wealthData)["copilot"];
};

export type BarriguitasSnapshot = {
  couple: BarriguitasCoupleData;
  house: BarriguitasHouseData;
  wealth: BarriguitasWealthData;
  lists: BarriguitasListsData;
  app: AppData;
};

export type BarriguitasOverrides = {
  couple?: Partial<{
    wedding: Partial<BarriguitasCoupleData["wedding"]>;
    nextTrip: Partial<BarriguitasCoupleData["nextTrip"]>;
    milestones: MilestoneEntry[];
  }>;
  house?: Partial<{
    cuidado: Partial<Pick<BarriguitasHouseData["cuidado"], "lastCleaningAt">>;
  }>;
  wealth?: Partial<{
    strategy: Partial<{ target: StrategyDistribution }>;
    currentDistribution: StrategyDistribution;
  }>;
};

/** Referencia única — React exige la misma referencia en cada getServerSnapshot. */
export const SERVER_SNAPSHOT: BarriguitasSnapshot = {
  couple: {
    ...coupleData,
    milestones: coupleData.milestones.map((milestone) => ({ ...milestone })),
  },
  house: {
    ...houseData,
    cuidado: {
      ...houseData.cuidado,
      lastCleaningAt: null,
    },
  },
  wealth: {
    ...wealthData,
    strategy: {
      ...wealthData.strategy,
      target: { ...wealthData.strategy.target },
    },
    currentDistribution: { ...wealthData.currentDistribution },
  },
  lists: {
    lists: listsData.lists.map((list) => ({
      ...list,
      items: list.items.map((item) => ({ ...item })),
    })),
  },
  app: appData,
};

export function createDefaultSnapshot(): BarriguitasSnapshot {
  return SERVER_SNAPSHOT;
}
