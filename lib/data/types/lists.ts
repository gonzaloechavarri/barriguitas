/** Identificadores demo — preparados para autenticación futura. */
export type DemoMemberId = "gonzalo" | "victoria";

export const DEMO_MEMBER_LABELS: Record<DemoMemberId, string> = {
  gonzalo: "Gonzalo",
  victoria: "Victoria",
};

export type SharedListItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
  createdBy: DemoMemberId;
  completedBy: DemoMemberId | null;
};

export type SharedList = {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  items: SharedListItem[];
};

/**
 * Listas compartidas del hogar.
 * `houseId` delimitará el alcance de sincronización entre Gonzalo y Victoria.
 */
export type BarriguitasListsData = {
  houseId: string;
  lists: SharedList[];
  /** IDs eliminados — evita que listas demo vuelvan al recargar. */
  deletedListIds?: string[];
};
