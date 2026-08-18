export const appData = {
  today: {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    /** Placeholder hasta que los módulos reporten su estado real. */
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      celebrate: ["Buen momento.", "Disfrutad del proceso."] as const,
=======
<<<<<<< HEAD
      celebrate: [
        "Buen momento.",
        "Disfrutad del proceso.",
      ] as const,
=======
      celebrate: ["Buen momento.", "Disfrutad del proceso."] as const,
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    ajustes: "Ajustes",
=======
<<<<<<< HEAD
    ajustes: "Cómo funciona Barriguitas para nosotros.",
=======
    ajustes: "Ajustes",
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
<<<<<<< HEAD
    agendaPlaceholder:
      "Próximamente se sincronizará con vuestro calendario compartido.",
    exportLabel: "Exportar datos",
    importLabel: "Importar datos",
    version: "0.1.0",
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  },
} as const;

export type AppData = typeof appData;
