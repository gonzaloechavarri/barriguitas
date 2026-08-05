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
    attentionIntro: "Hoy hay 4 cosas que merecen vuestra atención.",
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
        icon: "💰",
        title: "Patrimonio",
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

  modules: {
    agenda: {
      icon: "📅",
      title: "Agenda",
      description: "Organización y alivio de carga mental",
    },
    patrimonio: {
      icon: "💰",
      title: "Patrimonio",
      description: "Los mano rotas ahorrando",
    },
  },
} as const;

export type FamilyConfig = typeof familyConfig;
