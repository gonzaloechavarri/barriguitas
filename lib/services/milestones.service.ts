import { getFamilyConfig } from "@/lib/data/providers/local";
import type { CopilotTaskOrigin } from "@/lib/data/types";

export type Milestone = {
  id: string;
  title: string;
  priority: number;
  origin: CopilotTaskOrigin;
};

function milestoneIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Fuente única de hitos para Nosotros y Copiloto.
 * El orden en config define la prioridad.
 */
export function getMilestones(): Milestone[] {
  const { milestones } = getFamilyConfig();

  return milestones.map((title, index) => ({
    id: milestoneIdFromTitle(title),
    title,
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
