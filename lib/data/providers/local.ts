import { getBarriguitasSnapshot } from "@/lib/data/store/snapshot";
import { createDefaultSnapshot } from "@/lib/data/store/types";

export function getAppData() {
  return getBarriguitasSnapshot().app;
}

export function getCoupleData() {
  return getBarriguitasSnapshot().couple;
}

export function getHouseData() {
  return getBarriguitasSnapshot().house;
}

export function getWealthData() {
  return getBarriguitasSnapshot().wealth;
}

export function getDefaultSnapshot() {
  return createDefaultSnapshot();
<<<<<<< HEAD
=======
}

/** Compatibilidad con módulos que aún lean config estática. */
export function getFamilyConfig() {
  const snapshot = getBarriguitasSnapshot();
  const { couple, house, wealth, app } = snapshot;

  return {
    members: couple.members,
    wedding: couple.wedding,
    nextTrip: couple.nextTrip,
    milestones: couple.milestones.map((milestone) => milestone.title),
    goals: [] as const,
    today: app.today,
    patrimonio: {
      cardTitle: wealth.cardTitle,
      subtitle: wealth.subtitle,
      performanceLookbackYears: wealth.performanceLookbackYears,
      marketAssets: wealth.marketAssets,
      strategy: wealth.strategy,
      holdings: wealth.holdings,
      rebalancePhilosophy: wealth.rebalancePhilosophy,
    },
    modules: app.modules,
    casa: house,
    ajustes: app.ajustes,
    moduleHeaders: app.moduleHeaders,
    copilot: {
      celebrate: { active: false },
      copy: {
        action: {
          header: couple.copilot.shell.actionHeader,
          subtext: couple.copilot.subtitle,
        },
        calm: {
          header: couple.copilot.shell.calmHeader,
          content: couple.copilot.calm.title,
          subtext: couple.copilot.calm.subtitle,
        },
        celebrate: {
          header: "❤️ Buen momento.",
          content: "Ya queda menos para decir sí.",
          subtext: "Disfrutad del proceso.",
        },
      },
    },
  };
>>>>>>> cursor/text-polish-ajustes-e9c9
}

/** Compatibilidad con módulos que aún lean config estática. */
export function getFamilyConfig() {
  const snapshot = getBarriguitasSnapshot();
  const { couple, house, wealth, app } = snapshot;

  return {
    members: couple.members,
    wedding: couple.wedding,
    nextTrip: couple.nextTrip,
    milestones: couple.milestones.map((milestone) => milestone.title),
    goals: [] as const,
    today: app.today,
    patrimonio: {
      cardTitle: wealth.cardTitle,
      subtitle: wealth.subtitle,
      performanceLookbackYears: wealth.performanceLookbackYears,
      marketAssets: wealth.marketAssets,
      strategy: wealth.strategy,
      holdings: wealth.holdings,
      rebalancePhilosophy: wealth.rebalancePhilosophy,
    },
    modules: app.modules,
    casa: house,
    ajustes: app.ajustes,
    moduleHeaders: app.moduleHeaders,
    copilot: {
      celebrate: { active: false },
      copy: {
        action: {
          header: couple.copilot.shell.actionHeader,
          subtext: couple.copilot.subtitle,
        },
        calm: {
          header: couple.copilot.shell.calmHeader,
          content: couple.copilot.calm.title,
          subtext: couple.copilot.calm.subtitle,
        },
        celebrate: {
          header: "❤️ Buen momento.",
          content: "Ya queda menos para decir sí.",
          subtext: "Disfrutad del proceso.",
        },
      },
    },
  };
}
