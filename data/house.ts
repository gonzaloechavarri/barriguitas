export const houseData = {
  cuidado: {
    icon: "🧹",
    title: "Cuidado",
    itemLabel: "Limpieza interior",
    defaultDaysAgo: 7,
    markDoneLabel: "Registrar limpieza",
    updatedLabel: "✓ Actualizado",
  },
  nuevoHogar: {
    icon: "🏠",
    title: "Nuevo hogar",
    statusLines: ["Buscando con calma.", "Sin visitas esta semana."] as const,
  },
  mantenimiento: {
    icon: "🔧",
    title: "Mantenimiento",
    statusLines: ["Sin revisiones pendientes."] as const,
  },
  menu: {
    markDone: "✓ Marcar realizado",
    edit: "Editar",
    hide: "Ocultar",
    delete: "Eliminar",
  },

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  /** Señales futuras para el Copiloto. */
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  copilot: {
    icon: "🏡",
  },
} as const;

export type HouseData = typeof houseData;
