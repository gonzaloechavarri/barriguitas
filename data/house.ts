export const HOME_PHASES = [
  { id: "preparacion", label: "Preparación" },
  { id: "busqueda", label: "Búsqueda" },
  { id: "compra", label: "Compra" },
  { id: "reforma", label: "Reforma" },
] as const;

export type HomePhaseId = (typeof HOME_PHASES)[number]["id"];

export type HomeSearchCriterion = {
  id: string;
  label: string;
};

export type HomeSearchCriteria = {
  essentials: HomeSearchCriterion[];
  preferences: HomeSearchCriterion[];
};

export type HomeCriteriaGroup = keyof HomeSearchCriteria;

export function isHomePhaseId(value: unknown): value is HomePhaseId {
  return HOME_PHASES.some((phase) => phase.id === value);
}

const DEFAULT_ESSENTIALS: HomeSearchCriterion[] = [
  { id: "size", label: "📐 >130 m²" },
  { id: "floor", label: "🏙️ 6.º piso o más" },
  { id: "garage", label: "🚗 Garaje" },
  { id: "rooms", label: "🛏️ >4 habitaciones" },
  { id: "city", label: "📍 Valencia" },
];

const DEFAULT_PREFERENCES: HomeSearchCriterion[] = [
  { id: "turia", label: "🌳 Cerca del antiguo cauce del Turia" },
  { id: "pool", label: "🏊 Piscina" },
  { id: "outdoor", label: "🌿 Espacio exterior" },
  { id: "penthouse", label: "🏙️ Ático" },
];

export function cloneHomeCriteria(
  criteria: {
    essentials: readonly HomeSearchCriterion[];
    preferences: readonly HomeSearchCriterion[];
  },
): HomeSearchCriteria {
  return {
    essentials: criteria.essentials.map((item) => ({ ...item })),
    preferences: criteria.preferences.map((item) => ({ ...item })),
  };
}

function normalizeHomeCriteriaGroup(
  value: unknown,
  fallback: readonly HomeSearchCriterion[],
): HomeSearchCriterion[] {
  if (!Array.isArray(value)) {
    return fallback.map((item) => ({ ...item }));
  }

  const seen = new Set<string>();
  const next: HomeSearchCriterion[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;

    const record = item as { id?: unknown; label?: unknown };
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const label = typeof record.label === "string" ? record.label.trim() : "";

    if (!id || !label || seen.has(id)) continue;

    seen.add(id);
    next.push({ id, label });
  }

  return next;
}

export function normalizeHomeCriteria(
  value: unknown,
  fallback: HomeSearchCriteria,
): HomeSearchCriteria {
  if (!value || typeof value !== "object") {
    return cloneHomeCriteria(fallback);
  }

  const raw = value as { essentials?: unknown; preferences?: unknown };

  return {
    essentials: normalizeHomeCriteriaGroup(raw.essentials, fallback.essentials),
    preferences: normalizeHomeCriteriaGroup(
      raw.preferences,
      fallback.preferences,
    ),
  };
}

export const houseData = {
  city: "Valencia",
  phases: HOME_PHASES,
  phase: "preparacion" as HomePhaseId,
  nextStep: "🔎 Elegir inmobiliarias.",
  criteria: {
    essentials: DEFAULT_ESSENTIALS,
    preferences: DEFAULT_PREFERENCES,
  },
  copilot: {
    icon: "🏡",
  },
} as const;

export type HouseData = typeof houseData;
