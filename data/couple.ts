export const coupleData = {
  members: ["Victoria", "Gonzalo"] as const,

  wedding: {
    date: "2026-10-24",
    journeyStartDate: "2025-10-24",
    cardTitle: "Nuestra boda",
    countdownLabel: 'días para decir "sí quiero"',
    progressMessage: "Se acerca el mejor día de nuestra vida❤️",
  },

  nextTrip: {
    cardTitle: "Luna de miel",
    destination: "Camboya · Singapur · Maldivas",
    startDate: "2026-10-27",
  },

  milestones: [
    {
      id: "expediente-matrimonial",
      title: "Expediente matrimonial",
      completed: false,
    },
    {
      id: "seleccion-del-baile",
      title: "Selección del baile",
      completed: false,
    },
    {
      id: "eleccion-del-dj",
      title: "Elección del DJ",
      completed: false,
    },
  ] as const,

  copilot: {
    icon: "❤️",
    subtitle: "Es lo único que merece vuestra atención esta semana.",
    calm: {
      title: "Hoy puedes olvidarte de mí.",
      subtitle: "Todo evoluciona según lo previsto.",
    },
    shell: {
      actionHeader: "Hoy solo hay una cosa importante.",
      calmHeader: "Todo está bajo control.",
    },
  },
} as const;

export type CoupleData = typeof coupleData;
