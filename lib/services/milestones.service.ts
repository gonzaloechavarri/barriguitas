<<<<<<< Updated upstream
import type { MilestoneEntry } from "@/lib/data/types/editable";
import { getCoupleData } from "@/lib/data/providers/local";
import type { CopilotTaskOrigin } from "@/lib/data/types";
=======
<<<<<<< HEAD
import { getCoupleData } from "@/lib/data/providers/local";
import type { MilestoneEntry } from "@/lib/data/types/editable";
=======
import type { MilestoneEntry } from "@/lib/data/types/editable";
import { getCoupleData } from "@/lib/data/providers/local";
import type { CopilotTaskOrigin } from "@/lib/data/types";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

export type Milestone = {
  id: string;
  title: string;
  priority: number;
  origin: CopilotTaskOrigin;
};

function getPendingMilestones(milestones: MilestoneEntry[]): MilestoneEntry[] {
  return milestones.filter((milestone) => !milestone.completed);
}

/**
 * Fuente única de hitos pendientes para Nosotros y Copiloto.
 * El orden en config define la prioridad.
 */
export function getMilestones(): Milestone[] {
  const { milestones } = getCoupleData();

  return getPendingMilestones(milestones).map((milestone, index) => ({
    id: milestone.id,
    title: milestone.title,
    priority: index + 1,
    origin: "wedding",
  }));
}

export function getMilestoneTitles(): string[] {
  return getMilestones().map((milestone) => milestone.title);
}

export function getTopMilestone(): Milestone | null {
  const milestones = getMilestones();
  return milestones[0] ?? null;
}
