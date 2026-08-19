export type SharedListItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
  /** Fecha de vencimiento opcional — formato YYYY-MM-DD. */
  dueDate: string | null;
};

export type SharedList = {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  items: SharedListItem[];
};

/** Datos demo embebidos — solo para seed inicial remoto. */
export type BarriguitasListsData = {
  lists: SharedList[];
};
