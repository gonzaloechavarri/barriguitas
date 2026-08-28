import {
  HOME_PHASES,
  isHomePhaseId,
  type HomeCriteriaGroup,
  type HomePhaseId,
} from "@/data/house";
import type { MilestoneEntry, StrategyDistribution } from "@/lib/data/types/editable";
import { updateBarriguitas } from "@/lib/data/store/barriguitas-store";
import type { BarriguitasSnapshot } from "@/lib/data/store/types";
import { resolveWealthAllocation } from "@/lib/services/wealth-allocation.service";
import { formatSnapshotDateLabel } from "@/lib/services/wealth-snapshot.service";

export type SettingsMilestoneView = MilestoneEntry & {
  priority: number;
};

export type SettingsNosotrosView = {
  weddingDate: string;
  tripTitle: string;
  tripDestination: string;
  tripStartDate: string;
  milestones: SettingsMilestoneView[];
};

export type SettingsCasaView = {
  phase: HomePhaseId;
  phaseLabel: string;
  nextStep: string;
  phases: typeof HOME_PHASES;
};

export type SettingsAhorroView = {
  target: StrategyDistribution;
  current: StrategyDistribution;
  lastUpdatedLabel: string;
  labels: {
    acwi: string;
    oro: string;
    nasdaq: string;
  };
};

export type SettingsAgendaView = {
  placeholder: string;
};

export type SettingsAppView = {
  version: string;
  exportLabel: string;
  importLabel: string;
};

export type SettingsView = {
  nosotros: SettingsNosotrosView;
  casa: SettingsCasaView;
  ahorro: SettingsAhorroView;
  agenda: SettingsAgendaView;
  app: SettingsAppView;
};

function createMilestoneId(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return base || `hito-${Date.now()}`;
}

function getPendingMilestones(milestones: MilestoneEntry[]): MilestoneEntry[] {
  return milestones.filter((milestone) => !milestone.completed);
}

function withUniqueMilestoneId(
  milestones: MilestoneEntry[],
  title: string,
): string {
  const baseId = createMilestoneId(title);
  if (!milestones.some((milestone) => milestone.id === baseId)) {
    return baseId;
  }

  return `${baseId}-${Date.now()}`;
}

export function buildSettingsView(snapshot: BarriguitasSnapshot): SettingsView {
  const { couple, house, wealth, app } = snapshot;
  const phaseLabel =
    HOME_PHASES.find((phase) => phase.id === house.phase)?.label ??
    HOME_PHASES[0].label;

  return {
    nosotros: {
      weddingDate: couple.wedding.date,
      tripTitle: couple.nextTrip.cardTitle,
      tripDestination: couple.nextTrip.destination,
      tripStartDate: couple.nextTrip.startDate,
      milestones: getPendingMilestones(couple.milestones).map(
        (milestone, index) => ({
          ...milestone,
          priority: index + 1,
        }),
      ),
    },
    casa: {
      phase: house.phase,
      phaseLabel,
      nextStep: house.nextStep,
      phases: HOME_PHASES,
    },
    ahorro: {
      target: { ...wealth.strategy.target },
      current: resolveWealthAllocation(wealth).current,
      lastUpdatedLabel: formatSnapshotDateLabel(wealth.portfolioSnapshot.updatedAt),
      labels: {
        acwi: wealth.strategy.assets.acwi.label,
        oro: wealth.strategy.assets.oro.label,
        nasdaq: wealth.strategy.assets.nasdaq.label,
      },
    },
    agenda: {
      placeholder: app.ajustes.agendaPlaceholder,
    },
    app: {
      version: app.ajustes.version,
      exportLabel: app.ajustes.exportLabel,
      importLabel: app.ajustes.importLabel,
    },
  };
}

export function updateWeddingDate(date: string): void {
  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      wedding: {
        ...current.couple.wedding,
        date,
      },
    },
  }));
}

export function updateTrip(fields: {
  cardTitle: string;
  destination: string;
  startDate: string;
}): void {
  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      nextTrip: {
        ...current.couple.nextTrip,
        ...fields,
      },
    },
  }));
}

export function addMilestone(title: string): void {
  const trimmed = title.trim();
  if (!trimmed) return;

  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      milestones: [
        ...current.couple.milestones,
        {
          id: withUniqueMilestoneId(current.couple.milestones, trimmed),
          title: trimmed,
          completed: false,
        },
      ],
    },
  }));
}

export function updateMilestoneTitle(id: string, title: string): void {
  const trimmed = title.trim();
  if (!trimmed) return;

  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      milestones: current.couple.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, title: trimmed } : milestone,
      ),
    },
  }));
}

export function deleteMilestone(id: string): void {
  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      milestones: current.couple.milestones.filter(
        (milestone) => milestone.id !== id,
      ),
    },
  }));
}

export function completeMilestone(id: string): void {
  updateBarriguitas((current) => ({
    ...current,
    couple: {
      ...current.couple,
      milestones: current.couple.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, completed: true } : milestone,
      ),
    },
  }));
}

export function moveMilestone(id: string, direction: "up" | "down"): void {
  updateBarriguitas((current) => {
    const pending = getPendingMilestones(current.couple.milestones);
    const index = pending.findIndex((milestone) => milestone.id === id);

    if (index === -1) return current;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pending.length) return current;

    const reorderedPending = [...pending];
    const [moved] = reorderedPending.splice(index, 1);
    reorderedPending.splice(targetIndex, 0, moved);

    const completed = current.couple.milestones.filter(
      (milestone) => milestone.completed,
    );

    return {
      ...current,
      couple: {
        ...current.couple,
        milestones: [...reorderedPending, ...completed],
      },
    };
  });
}

export function updateHomePhase(phase: HomePhaseId): void {
  if (!isHomePhaseId(phase)) return;

  updateBarriguitas((current) => ({
    ...current,
    house: {
      ...current.house,
      phase,
    },
  }));
}

export function updateHomeNextStep(nextStep: string): void {
  const trimmed = nextStep.trim();
  if (!trimmed) return;

  updateBarriguitas((current) => ({
    ...current,
    house: {
      ...current.house,
      nextStep: trimmed,
    },
  }));
}

export function updateHomeCriterion(
  group: HomeCriteriaGroup,
  id: string,
  label: string,
): void {
  const trimmed = label.trim();

  updateBarriguitas((current) => {
    const items = current.house.criteria[group];
    if (!items.some((item) => item.id === id)) return current;

    const nextItems = trimmed
      ? items.map((item) =>
          item.id === id ? { ...item, label: trimmed } : item,
        )
      : items.filter((item) => item.id !== id);

    return {
      ...current,
      house: {
        ...current.house,
        criteria: {
          essentials:
            group === "essentials" ? nextItems : current.house.criteria.essentials,
          preferences:
            group === "preferences"
              ? nextItems
              : current.house.criteria.preferences,
        },
      },
    };
  });
}

export function addHomeCriterion(group: HomeCriteriaGroup, label: string): void {
  const trimmed = label.trim();
  if (!trimmed) return;

  updateBarriguitas((current) => {
    const items = current.house.criteria[group];
    const nextItems = [
      ...items,
      { id: `criterio-${group}-${Date.now()}`, label: trimmed },
    ];

    return {
      ...current,
      house: {
        ...current.house,
        criteria: {
          essentials:
            group === "essentials" ? nextItems : current.house.criteria.essentials,
          preferences:
            group === "preferences"
              ? nextItems
              : current.house.criteria.preferences,
        },
      },
    };
  });
}

export function updateWealthTarget(target: StrategyDistribution): void {
  updateBarriguitas((current) => ({
    ...current,
    wealth: {
      ...current.wealth,
      strategy: {
        ...current.wealth.strategy,
        target: { ...target },
      },
    },
  }));
}

export function exportDataPlaceholder(): void {
  // Placeholder para una futura exportación.
}

export function importDataPlaceholder(): void {
  // Placeholder para una futura importación.
}
