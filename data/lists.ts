import type { BarriguitasListsData } from "@/lib/data/types/lists";

export const listsData: BarriguitasListsData = {
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
          dueDate: null,
        },
        {
          id: "carrefour-platanos",
          text: "Plátanos",
          completed: false,
          createdAt: "2026-08-17T08:05:00.000Z",
          completedAt: null,
          dueDate: null,
        },
        {
          id: "carrefour-cafe",
          text: "Café",
          completed: false,
          createdAt: "2026-08-17T08:10:00.000Z",
          completedAt: null,
          dueDate: null,
        },
        {
          id: "carrefour-salmon",
          text: "Salmón",
          completed: false,
          createdAt: "2026-08-17T08:15:00.000Z",
          completedAt: null,
          dueDate: null,
        },
        {
          id: "carrefour-detergente",
          text: "Detergente",
          completed: false,
          createdAt: "2026-08-17T08:20:00.000Z",
          completedAt: null,
          dueDate: null,
        },
      ],
    },
    {
      id: "mercadona",
      name: "Mercadona",
      icon: "🛒",
      createdAt: "2026-08-10T09:00:00.000Z",
      items: [
        {
          id: "mercadona-pan",
          text: "Pan",
          completed: false,
          createdAt: "2026-08-16T10:00:00.000Z",
          completedAt: null,
          dueDate: null,
        },
        {
          id: "mercadona-yogur",
          text: "Yogur",
          completed: false,
          createdAt: "2026-08-16T10:05:00.000Z",
          completedAt: null,
          dueDate: null,
        },
        {
          id: "mercadona-arroz",
          text: "Arroz",
          completed: false,
          createdAt: "2026-08-16T10:10:00.000Z",
          completedAt: null,
          dueDate: null,
        },
      ],
    },
  ],
};
