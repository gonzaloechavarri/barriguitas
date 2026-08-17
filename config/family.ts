export const familyConfig = {
  members: ["Victoria", "Gonzalo"] as const,

  wedding: {
    date: "2026-10-24",
    journeyStartDate: "2025-10-24",
    cardTitle: "Nuestra boda",
    countdownLabel: "días para decir \"sí quiero\"",
    progressMessage: "Se acerca el mejor día de nuestra vida❤️",
  },

  nextTrip: {
    cardTitle: "Luna de miel",
    destination: "Camboya · Singapur · Maldivas",
    startDate: "2026-10-27",
  },

  milestones: [
    "Expediente matrimonial",
    "Selección del baile",
    "Elección del DJ",
  ] as const,

  goals: [] as const,

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

  patrimonio: {
    cardTitle: "Ahorro",
    subtitle: "La estrategia sigue su camino.",
    /** Años de histórico para la métrica de largo plazo. */
    performanceLookbackYears: 5,
    marketAssets: {
      acwi: {
        isin: "IE00B44Z5B48",
        yahooSymbol: "ISAC.L",
      },
      oro: {
        isin: "IE00B579F325",
        yahooSymbol: "SGLN.L",
      },
    },
    strategy: {
      cardTitle: "Estrategia",
      target: { acwi: 85, oro: 10, momentum: 5 },
      deviationThreshold: 3,
      transitionMessage:
        "La estrategia está evolucionando hacia el nuevo objetivo.",
      assets: {
        acwi: { icon: "🌍", label: "Global" },
        oro: { icon: "🥇", label: "Oro" },
        momentum: { icon: "⚡", label: "Momentum" },
      },
    },
    /** Posiciones internas — nunca se muestran en la interfaz. */
    holdings: [
      { assetClass: "acwi", value: 280_246.36, source: "indexa" },
      { assetClass: "acwi", value: 22_397.4, source: "IE00B44Z5B48" },
      { assetClass: "oro", value: 69_447.02, source: "IE00B579F325" },
    ] as const,
    /** Futuro Copiloto: sugerir aportaciones, nunca ventas. */
    rebalancePhilosophy: "contributions-only" as const,
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

  casa: {
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
  },

  ajustes: {
    subtitle: "Manteniendo Barriguitas al día.",
    agenda: {
      placeholder: "Aquí aparecerán nuestros próximos planes.",
      summary: "En camino",
    },
    app: {
      version: "0.1.0",
      tagline: "Construida con ❤️ para nosotros.",
      exportLabel: "Guardar una copia",
      importLabel: "Recuperar una copia",
    },
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

  moduleHeaders: {
    documentos: "",
    nosotros: "Quedan {days} días para decir sí.",
    casa: "El cuidado de nuestra casa.",
    patrimonio: "",
    agenda: "No hay nada urgente.",
    ia: "Hoy puedes olvidarte de mí.",
    ajustes: "Ajustes",
  },

  copilot: {
    celebrate: {
      active: false,
    },
    copy: {
      action: {
        header: "Hoy solo hay una cosa importante.",
        subtext: "Es lo único que merece vuestra atención esta semana.",
      },
      calm: {
        header: "Todo está bajo control.",
        content: "Hoy puedes olvidarte de mí.",
        subtext: "Todo evoluciona según lo previsto.",
      },
      celebrate: {
        header: "❤️ Buen momento.",
        content: "Ya queda menos para decir sí.",
        subtext: "Disfrutad del proceso.",
      },
    },
  },
} as const;

export type FamilyConfig = typeof familyConfig;
