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
    cardTitle: "Nuestro próximo plan",
    label: "Escapada",
    destination: "San Sebastián",
    subtitle: "Pintxos, el Julensito y desconexión.",
  },

  milestones: [
    "Confirmación de invitados",
    "Selección del baile",
    "Elección del DJ",
  ] as const,

  goals: [] as const,

  today: {
    /** Placeholder hasta que los módulos reporten su estado real. */
    attentionState: "calm" as const,
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
        subtitle: "Todo evoluciona según el plan.",
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
    subtitle: "Todo evoluciona según el plan.",
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
      target: { acwi: 80, oro: 20 },
      deviationThreshold: 3,
      alignedMessage: "✓ Estrategia alineada con el objetivo.",
      driftMessage: "La estrategia empieza a desviarse ligeramente.",
      assets: {
        acwi: { icon: "🌍", label: "ACWI" },
        oro: { icon: "🥇", label: "Oro" },
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

  moduleHeaders: {
    documentos: "Todo está bajo control.",
    nosotros: "Quedan {days} días para decir sí.",
    casa: "El cuidado de nuestra casa.",
    patrimonio: "",
    agenda: "No hay nada urgente.",
    ia: "Hoy puedes olvidarte de mí.",
    ajustes: "Cómo funciona Barriguitas para nosotros.",
  },

  copilot: {
    celebrate: {
      active: false,
    },
    copy: {
      action: {
        header: "Hoy hay una cosa importante.",
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
    tasks: [
      {
        id: "invitados",
        title: "Confirmar la lista de invitados",
        status: "pending",
        priority: 1,
        origin: "wedding",
      },
      {
        id: "coreografo",
        title: "Elegir coreógrafo para el baile",
        status: "pending",
        priority: 2,
        origin: "wedding",
      },
      {
        id: "dj",
        title: "Confirmar DJ",
        status: "pending",
        priority: 3,
        origin: "wedding",
      },
    ] as const,
  },
} as const;

export type FamilyConfig = typeof familyConfig;
