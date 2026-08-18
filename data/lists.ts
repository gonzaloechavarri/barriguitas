import type { BarriguitasListsData } from "@/lib/data/types/lists";

export const listsData: BarriguitasListsData = {
  houseId: "demo-house-barriguitas",
  lists: [
    {
      id: "carrefour",
      name: "Carrefour",
      icon: "🛒",
      createdAt: "2026-08-01T09:00:00.000Z",
      items: [
        {
          id: "carrefour-leche",
          text: "Leche",
          completed: false,
          createdAt: "2026-08-17T08:00:00.000Z",
          completedAt: null,
          createdBy: "gonzalo",
          completedBy: null,
        },
        {
          id: "carrefour-platanos",
          text: "Plátanos",
          completed: false,
          createdAt: "2026-08-17T08:05:00.000Z",
          completedAt: null,
          createdBy: "victoria",
          completedBy: null,
        },
        {
          id: "carrefour-cafe",
          text: "Café",
          completed: false,
          createdAt: "2026-08-17T08:10:00.000Z",
          completedAt: null,
          createdBy: "gonzalo",
          completedBy: null,
        },
        {
          id: "carrefour-salmon",
          text: "Salmón",
          completed: false,
          createdAt: "2026-08-17T08:15:00.000Z",
          completedAt: null,
          createdBy: "victoria",
          completedBy: null,
        },
        {
          id: "carrefour-detergente",
          text: "Detergente",
          completed: false,
          createdAt: "2026-08-17T08:20:00.000Z",
          completedAt: null,
          createdBy: "gonzalo",
          completedBy: null,
        },
      ],
    },
  ],
};
