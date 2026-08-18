export const appData = {
  today: {
    /** Placeholder hasta que los módulos reporten su estado real. */
    attentionState: "calm" as const,
    headerMessages: {
      calm: [
        "Todo está bajo control.",
        "Un día tranquilo.",
        "Seguimos según el plan.",
        "Todo sigue en orden.",
      ] as const,
      action: [
        "Hoy solo hay una cosa importante.",
        "Una cosa merece vuestra atención hoy.",
      ] as const,
      celebrate: [
        "Buen momento.",
        "Disfrutad del proceso.",
      ] as const,
    },
    nosotrosAttention: {
      icon: "❤️",
      title: "Nosotros",
      subtitleTemplate: '{days} días para decir el "sí quiero"',
    },
    attentionItems: [
      {
        icon: "🏡",
        title: "Villa Barriguita",
        subtitle: "No hay tareas pendientes.",
      },
      {
        icon: "🌱",
        title: "Ahorro",
        subtitle: "La estrategia sigue su camino.",
      },
      {
        icon: "📅",
        title: "Agenda",
        subtitle: "Hoy no hay eventos.",
      },
      {
        icon: "🤖",
        title: "Copiloto",
        subtitle: "Tengo una sugerencia para vosotros.",
      },
    ] as const,
  },

  moduleHeaders: {
    documentos: "",
    nosotros: "Quedan {days} días para decir sí.",
    casa: "El cuidado de nuestra casa.",
    patrimonio: "",
    agenda: "No hay nada urgente.",
    listas: "Lo que falta por hacer juntos.",
    ia: "Hoy puedes olvidarte de mí.",
    ajustes: "Cómo funciona Barriguitas para nosotros.",
  },

  modules: {
    agenda: {
      icon: "📅",
      title: "Agenda",
      description: "Organización y alivio de carga mental",
    },
    patrimonio: {
      icon: "🌱",
      title: "Ahorro",
      description: "Los mano rotas ahorrando",
    },
  },

  ajustes: {
    agendaPlaceholder:
      "Próximamente se sincronizará con vuestro calendario compartido.",
    exportLabel: "Exportar datos",
    importLabel: "Importar datos",
    version: "0.1.0",
  },
} as const;

export type AppData = typeof appData;
