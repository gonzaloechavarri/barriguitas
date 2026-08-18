import type { MilestoneEntry, StrategyDistribution } from "@/lib/data/types/editable";
import { updateBarriguitas } from "@/lib/data/store/barriguitas-store";
import type { BarriguitasSnapshot } from "@/lib/data/store/types";
import {
  daysSince,
  formatDaysElapsed,
  formatShortDate,
  resolveCleaningDate,
} from "@/lib/data/utils/dates";

export type SettingsMilestoneView = MilestoneEntry & {
  priority: number;
};

export type SettingsNosotrosView = {
<<<<<<< Updated upstream
  summary: string;
=======
<<<<<<< HEAD
=======
  summary: string;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  weddingDate: string;
  tripTitle: string;
  tripDestination: string;
  tripStartDate: string;
  milestones: SettingsMilestoneView[];
<<<<<<< Updated upstream
  copy: {
    weddingDate: string;
    tripTitle: string;
    tripDestination: string;
    tripStartDate: string;
    milestonesTitle: string;
    addMilestone: string;
    addMilestonePlaceholder: string;
    completeMilestone: string;
    deleteMilestone: string;
  };
};

export type SettingsCasaView = {
  summary: string;
=======
<<<<<<< HEAD
};

export type SettingsCasaView = {
=======
  copy: {
    weddingDate: string;
    tripTitle: string;
    tripDestination: string;
    tripStartDate: string;
    milestonesTitle: string;
    addMilestone: string;
    addMilestonePlaceholder: string;
    completeMilestone: string;
    deleteMilestone: string;
  };
};

export type SettingsCasaView = {
  summary: string;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  itemLabel: string;
  lastCleaningLabel: string;
  daysElapsedLabel: string;
  markDoneLabel: string;
<<<<<<< Updated upstream
  copy: {
    lastCleaning: string;
  };
};

export type SettingsAhorroView = {
  summary: string;
=======
<<<<<<< HEAD
};

export type SettingsAhorroView = {
=======
  copy: {
    lastCleaning: string;
  };
};

export type SettingsAhorroView = {
  summary: string;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  target: StrategyDistribution;
  current: StrategyDistribution;
  labels: {
    acwi: string;
    oro: string;
    momentum: string;
  };
<<<<<<< Updated upstream
  copy: {
    targetTitle: string;
    currentTitle: string;
  };
};

export type SettingsAgendaView = {
=======
<<<<<<< HEAD
};

export type SettingsAgendaView = {
=======
  copy: {
    targetTitle: string;
    currentTitle: string;
  };
};

export type SettingsAgendaView = {
>>>>>>> Stashed changes
  summary: string;
  placeholder: string;
};

export type SettingsCopilotoView = {
  summary: string;
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  placeholder: string;
};

export type SettingsAppView = {
<<<<<<< Updated upstream
  summary: string;
  version: string;
  tagline: string;
=======
<<<<<<< HEAD
  version: string;
=======
  summary: string;
  version: string;
  tagline: string;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  exportLabel: string;
  importLabel: string;
};

export type SettingsView = {
<<<<<<< Updated upstream
  title: string;
  subtitle: string;
  notice: string;
=======
<<<<<<< HEAD
=======
  title: string;
  subtitle: string;
  notice: string;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  nosotros: SettingsNosotrosView;
  casa: SettingsCasaView;
  ahorro: SettingsAhorroView;
  agenda: SettingsAgendaView;
<<<<<<< Updated upstream
  copiloto: SettingsCopilotoView;
=======
<<<<<<< HEAD
=======
  copiloto: SettingsCopilotoView;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const { ajustes } = app;
=======
<<<<<<< HEAD
=======
  const { ajustes } = app;
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  const cleaningDate = resolveCleaningDate(
    house.cuidado.lastCleaningAt,
    house.cuidado.defaultDaysAgo,
  );
  const elapsedDays = daysSince(cleaningDate);

  return {
<<<<<<< Updated upstream
    title: ajustes.title,
    subtitle: ajustes.subtitle,
    notice: ajustes.notice,
    nosotros: {
      summary: ajustes.nosotrosSummary,
=======
<<<<<<< HEAD
    nosotros: {
=======
    title: ajustes.title,
    subtitle: ajustes.subtitle,
    notice: ajustes.notice,
    nosotros: {
      summary: ajustes.nosotrosSummary,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      copy: {
        weddingDate: ajustes.copy.weddingDate,
        tripTitle: ajustes.copy.tripTitle,
        tripDestination: ajustes.copy.tripDestination,
        tripStartDate: ajustes.copy.tripStartDate,
        milestonesTitle: ajustes.copy.milestonesTitle,
        addMilestone: ajustes.copy.addMilestone,
        addMilestonePlaceholder: ajustes.copy.addMilestonePlaceholder,
        completeMilestone: ajustes.copy.completeMilestone,
        deleteMilestone: ajustes.copy.deleteMilestone,
      },
    },
    casa: {
      summary: ajustes.casaSummary,
=======
<<<<<<< HEAD
    },
    casa: {
=======
      copy: {
        weddingDate: ajustes.copy.weddingDate,
        tripTitle: ajustes.copy.tripTitle,
        tripDestination: ajustes.copy.tripDestination,
        tripStartDate: ajustes.copy.tripStartDate,
        milestonesTitle: ajustes.copy.milestonesTitle,
        addMilestone: ajustes.copy.addMilestone,
        addMilestonePlaceholder: ajustes.copy.addMilestonePlaceholder,
        completeMilestone: ajustes.copy.completeMilestone,
        deleteMilestone: ajustes.copy.deleteMilestone,
      },
    },
    casa: {
      summary: ajustes.casaSummary,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      itemLabel: house.cuidado.itemLabel,
      lastCleaningLabel: formatShortDate(cleaningDate),
      daysElapsedLabel: formatDaysElapsed(elapsedDays),
      markDoneLabel: house.cuidado.markDoneLabel,
<<<<<<< Updated upstream
      copy: {
        lastCleaning: ajustes.copy.lastCleaning,
      },
    },
    ahorro: {
      summary: ajustes.ahorroSummary,
=======
<<<<<<< HEAD
    },
    ahorro: {
=======
      copy: {
        lastCleaning: ajustes.copy.lastCleaning,
      },
    },
    ahorro: {
      summary: ajustes.ahorroSummary,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      target: { ...wealth.strategy.target },
      current: { ...wealth.currentDistribution },
      labels: {
        acwi: wealth.strategy.assets.acwi.label,
        oro: wealth.strategy.assets.oro.label,
        momentum: wealth.strategy.assets.momentum.label,
      },
<<<<<<< Updated upstream
      copy: {
        targetTitle: ajustes.copy.targetTitle,
        currentTitle: ajustes.copy.currentTitle,
      },
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    },
    agenda: {
      summary: ajustes.agendaSummary,
      placeholder: ajustes.agendaPlaceholder,
    },
    copiloto: {
      summary: ajustes.copilotoSummary,
      placeholder: ajustes.copilotoPlaceholder,
    },
    app: {
<<<<<<< Updated upstream
=======
      version: app.ajustes.version,
      exportLabel: app.ajustes.exportLabel,
      importLabel: app.ajustes.importLabel,
=======
      copy: {
        targetTitle: ajustes.copy.targetTitle,
        currentTitle: ajustes.copy.currentTitle,
      },
    },
    agenda: {
      summary: ajustes.agendaSummary,
      placeholder: ajustes.agendaPlaceholder,
    },
    copiloto: {
      summary: ajustes.copilotoSummary,
      placeholder: ajustes.copilotoPlaceholder,
    },
    app: {
>>>>>>> Stashed changes
      summary: ajustes.appSummary,
      version: ajustes.version,
      tagline: ajustes.tagline,
      exportLabel: ajustes.exportLabel,
      importLabel: ajustes.importLabel,
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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

export function registerCleaning(): void {
  updateBarriguitas((current) => ({
    ...current,
    house: {
      ...current.house,
      cuidado: {
        ...current.house.cuidado,
        lastCleaningAt: new Date().toISOString(),
      },
    },
  }));
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

export function updateWealthCurrentDistribution(
  currentDistribution: StrategyDistribution,
): void {
  updateBarriguitas((current) => ({
    ...current,
    wealth: {
      ...current.wealth,
      currentDistribution: { ...currentDistribution },
    },
  }));
}

export function exportDataPlaceholder(): void {
  // Placeholder para una futura exportación.
}

export function importDataPlaceholder(): void {
  // Placeholder para una futura importación.
}
