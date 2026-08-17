import type { ModuleHeader } from "@/lib/data/types";
import { getFamilyConfig } from "@/lib/data/providers/local";
import { daysUntil } from "@/lib/data/utils";
import type { ModuleId } from "@/lib/modules/types";
import { isHouseCaredFor } from "./casa.service";
import { getMilestones } from "./milestones.service";
import { calculateStrategyAllocation } from "./wealth.utils";

type HeaderSignalSource =
  | "nosotros"
  | "casa"
  | "ahorro"
  | "agenda"
  | "memoria"
  | "eventos";

type HeaderSignal = {
  source: HeaderSignalSource;
  message: string;
  /** Menor número = mayor relevancia. */
  priority: number;
};

const WEDDING_CLOSE_DAYS = 90;
const TRIP_CLOSE_DAYS = 90;

type SignalCollector = (referenceDate: Date) => HeaderSignal[];

function collectMilestoneSignals(referenceDate: Date): HeaderSignal[] {
  void referenceDate;

  if (getMilestones().length === 0) {
    return [];
  }

  return [
    {
      source: "nosotros",
      message: "Hoy hay una cosa importante.",
      priority: 10,
    },
  ];
}

function collectWeddingSignals(referenceDate: Date): HeaderSignal[] {
  const { wedding } = getFamilyConfig();
  const days = daysUntil(wedding.date, referenceDate);

  if (days === 0 || days > WEDDING_CLOSE_DAYS) {
    return [];
  }

  return [
    {
      source: "nosotros",
      message: "Cada día queda un poco menos.",
      priority: 20,
    },
  ];
}

function collectTripSignals(referenceDate: Date): HeaderSignal[] {
  const { nextTrip } = getFamilyConfig();
  const days = daysUntil(nextTrip.startDate, referenceDate);

  if (days === 0 || days > TRIP_CLOSE_DAYS) {
    return [];
  }

  return [
    {
      source: "nosotros",
      message: "La próxima aventura se acerca.",
      priority: 30,
    },
  ];
}

function collectHouseSignals(referenceDate: Date): HeaderSignal[] {
  if (!isHouseCaredFor(referenceDate)) {
    return [];
  }

  return [
    {
      source: "casa",
      message: "La casa está cuidada.",
      priority: 40,
    },
  ];
}

function collectWealthSignals(referenceDate: Date): HeaderSignal[] {
  void referenceDate;

  const { patrimonio } = getFamilyConfig();
  const allocation = calculateStrategyAllocation(
    patrimonio.holdings.map((holding) => ({
      assetClass: holding.assetClass,
      value: holding.value,
    })),
    patrimonio.strategy.target,
    patrimonio.strategy.deviationThreshold,
  );

  if (!allocation.isAligned) {
    return [];
  }

  return [
    {
      source: "ahorro",
      message: "La estrategia sigue su camino.",
      priority: 50,
    },
  ];
}

/** Señales futuras de Agenda. */
function collectAgendaSignals(_referenceDate: Date): HeaderSignal[] {
  return [];
}

/** Señales futuras de Memoria. */
function collectMemoriaSignals(_referenceDate: Date): HeaderSignal[] {
  return [];
}

/** Señales futuras de eventos especiales. */
function collectEventosSignals(_referenceDate: Date): HeaderSignal[] {
  return [];
}

function collectFallbackSignals(referenceDate: Date): HeaderSignal[] {
  void referenceDate;

  const signals: HeaderSignal[] = [];

  if (getMilestones().length === 0) {
    signals.push({
      source: "nosotros",
      message: "Todo sigue su curso.",
      priority: 80,
    });
  }

  signals.push({
    source: "nosotros",
    message: "Todo está en orden.",
    priority: 100,
  });

  return signals;
}

const SIGNAL_COLLECTORS: SignalCollector[] = [
  collectMilestoneSignals,
  collectWeddingSignals,
  collectTripSignals,
  collectHouseSignals,
  collectWealthSignals,
  collectAgendaSignals,
  collectMemoriaSignals,
  collectEventosSignals,
  collectFallbackSignals,
];

function resolveTopSignal(referenceDate: Date): HeaderSignal {
  const signals = SIGNAL_COLLECTORS.flatMap((collect) =>
    collect(referenceDate),
  ).sort((a, b) => a.priority - b.priority);

  return signals[0];
}

/**
 * Genera el mensaje del encabezado principal.
 * Resume con calma cómo va nuestra vida en una única frase.
 */
export function getHeaderMessage(referenceDate: Date = new Date()): string {
  return resolveTopSignal(referenceDate).message;
}

/** @deprecated Usar getHeaderMessage. */
export function getModuleHeader(
  _moduleId: ModuleId,
  referenceDate: Date = new Date(),
): ModuleHeader {
  return { message: getHeaderMessage(referenceDate) };
}
