export const appData = {
  today: {
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
      celebrate: ["Buen momento.", "Disfrutad del proceso."] as const,
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
    ia: "Hoy puedes olvidarte de mí.",
    ajustes: "Ajustes",
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
    title: "Nuestro cuaderno",
    subtitle: "Todo lo que mantiene Barriguitas al día.",
    notice:
      "Todo lo que cambiemos aquí se guarda automáticamente y se refleja en toda Barriguitas.",
    nosotrosSummary: "Los momentos que estamos construyendo.",
    casaSummary: "El cuidado de nuestro hogar.",
    ahorroSummary: "Nuestro plan para el futuro.",
    agendaPlaceholder: "Aquí aparecerán nuestros próximos planes.",
    agendaSummary: "Aquí aparecerán nuestros próximos planes.",
    copilotoPlaceholder:
      "Próximamente podremos personalizar cómo queremos que Barriguitas nos ayude.",
    copilotoSummary: "La ayuda inteligente de Barriguitas.",
    tagline: "Construida con ❤️ para nosotros.",
    appSummary: "Construida con ❤️ para nosotros.",
    exportLabel: "Guardar una copia",
    importLabel: "Recuperar una copia",
    version: "0.1.0",
    copy: {
      milestonesTitle: "Hitos",
      addMilestone: "Añadir",
      addMilestonePlaceholder: "Algo que tengamos entre mano",
      completeMilestone: "✓ Hecho",
      deleteMilestone: "Quitar",
      lastCleaning: "Última limpieza",
      targetTitle: "Nuestro objetivo",
      currentTitle: "Como está ahora",
      tripTitle: "Viaje · nombre",
      tripDestination: "Viaje · destinos",
      tripStartDate: "Viaje · cuándo empieza",
      weddingDate: "Fecha de la boda",
    },
  },
} as const;

export type AppData = typeof appData;
