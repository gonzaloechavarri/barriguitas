export const coupleData = {
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

  /** Reservado — los hitos visuales provienen de boda y viaje, no de tareas. */
  milestones: [] as Array<{
    id: string;
    title: string;
    completed: boolean;
  }>,

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
