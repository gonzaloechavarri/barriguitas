export const HOME_PHASES = [
  { id: "preparacion", label: "Preparación" },
  { id: "busqueda", label: "Búsqueda" },
  { id: "compra", label: "Compra" },
  { id: "reforma", label: "Reforma" },
] as const;

export type HomePhaseId = (typeof HOME_PHASES)[number]["id"];

export function isHomePhaseId(value: unknown): value is HomePhaseId {
  return HOME_PHASES.some((phase) => phase.id === value);
}

export const houseData = {
  city: "Valencia",
  phases: HOME_PHASES,
  phase: "preparacion" as HomePhaseId,
  nextStep: "Definir qué buscamos en nuestra casa.",
  copilot: {
    icon: "🏡",
  },
} as const;

export type HouseData = typeof houseData;
