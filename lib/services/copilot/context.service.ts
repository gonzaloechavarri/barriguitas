import type { CopilotObservation } from "@/lib/data/types";
import type { SharedList, SharedListItem } from "@/lib/data/types/lists";
import {
  formatCoupleEventDate,
  formatEventDaysRemaining,
} from "@/lib/data/utils";
import { parseIsoDate } from "@/lib/data/utils/dates";
import {
  getCoupleEvents,
  type CoupleEvent,
} from "@/lib/services/couple-events.service";
import { buildHoySummary, type HoySummary } from "@/lib/services/hoy.service";
import { getTimeBasedGreeting } from "@/lib/services/greeting.service";

export type CopilotQuickQuestion =
  | "pending"
  | "overdue"
  | "upcoming"
  | "busiestList"
  | "beforeWedding";

export type CopilotPendingListGroup = {
  listId: string;
  listName: string;
  listIcon: string;
  items: SharedListItem[];
};

export type CopilotContext = {
  hoy: HoySummary;
  pendingByList: CopilotPendingListGroup[];
  upcomingEvents: CoupleEvent[];
  totalPending: number;
  referenceDate: Date;
};

export type CopilotBrief = {
  greeting: string;
  summary: string;
};

const RESPONSE_ITEM_LIMIT = 5;
const BUSIEST_LIST_THRESHOLD = 4;
const NEXT_DAYS_WINDOW = 7;
const NEXT_DAYS_THRESHOLD = 3;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getPendingByList(lists: SharedList[]): CopilotPendingListGroup[] {
  return lists
    .map((list) => ({
      listId: list.id,
      listName: list.name,
      listIcon: list.icon,
      items: list.items.filter((item) => !item.completed),
    }))
    .filter((group) => group.items.length > 0);
}

function getUpcomingEvents(referenceDate: Date): CoupleEvent[] {
  return getCoupleEvents().filter(
    (event) => formatEventDaysRemaining(event.date, referenceDate) !== null,
  );
}

function isDueDateWithinNextDays(
  isoDate: string,
  referenceDate: Date,
  days: number,
): boolean {
  const due = startOfDay(parseIsoDate(isoDate));
  const start = startOfDay(referenceDate);
  const end = new Date(start);
  end.setDate(end.getDate() + days - 1);
  return due.getTime() >= start.getTime() && due.getTime() <= end.getTime();
}

function getPendingItemsDueNextDays(
  lists: SharedList[],
  referenceDate: Date,
  days: number,
): SharedListItem[] {
  return lists
    .flatMap((list) => list.items)
    .filter(
      (item) =>
        !item.completed &&
        item.dueDate !== null &&
        isDueDateWithinNextDays(item.dueDate, referenceDate, days),
    );
}

function getWeddingEvent(events: CoupleEvent[]): CoupleEvent | null {
  return events.find((event) => event.id === "wedding") ?? null;
}

function getTasksBeforeEvent(
  lists: SharedList[],
  eventDate: string,
  referenceDate: Date,
): SharedListItem[] {
  const eventDay = startOfDay(parseIsoDate(eventDate));
  const today = startOfDay(referenceDate);

  return lists
    .flatMap((list) => list.items)
    .filter((item) => {
      if (item.completed || !item.dueDate) {
        return false;
      }

      const due = startOfDay(parseIsoDate(item.dueDate));
      return due.getTime() < eventDay.getTime() && due.getTime() >= today.getTime();
    })
    .sort((left, right) => left.dueDate!.localeCompare(right.dueDate!));
}

function getBusiestListGroup(
  pendingByList: CopilotPendingListGroup[],
): CopilotPendingListGroup | null {
  if (pendingByList.length === 0) {
    return null;
  }

  return pendingByList.reduce((busiest, group) =>
    group.items.length > busiest.items.length ? group : busiest,
  );
}

function getCopilotGreeting(referenceDate: Date): string {
  const period = getTimeBasedGreeting(referenceDate).period;

  if (period === "morning") return "Buenos días 🦦";
  if (period === "afternoon") return "Buenas tardes 🦦";
  return "Buenas noches 🦦";
}

function formatOverduePhrase(count: number): string {
  if (count === 1) return "1 tarea vencida";
  return `${count} tareas vencidas`;
}

function formatTodayPhrase(count: number): string {
  if (count === 1) return "1 para hoy";
  return `${count} para hoy`;
}

function formatEventCountdown(event: CoupleEvent, referenceDate: Date): string | null {
  const daysLabel = formatEventDaysRemaining(event.date, referenceDate);
  if (!daysLabel) {
    return null;
  }

  if (event.id === "wedding") {
    return `${daysLabel.toLowerCase()} para la boda`;
  }

  return `${daysLabel.toLowerCase()} para ${event.title.toLowerCase()}`;
}

function buildSynthesisSummary(context: CopilotContext): string {
  const { hoy, upcomingEvents, totalPending } = context;
  const parts: string[] = [];

  if (hoy.overdue.length > 0 && hoy.today.length > 0) {
    parts.push(
      `Tenéis ${formatOverduePhrase(hoy.overdue.length)} y ${formatTodayPhrase(hoy.today.length)}.`,
    );
  } else if (hoy.overdue.length > 0) {
    parts.push(
      hoy.overdue.length === 1
        ? "Tenéis 1 tarea vencida."
        : `Tenéis ${hoy.overdue.length} tareas vencidas.`,
    );
  } else if (hoy.today.length > 0) {
    parts.push(
      hoy.today.length === 1
        ? "Tenéis 1 cosa para hoy."
        : `Tenéis ${hoy.today.length} cosas para hoy.`,
    );
  }

  if (upcomingEvents.length > 0) {
    const countdown = formatEventCountdown(
      upcomingEvents[0],
      context.referenceDate,
    );

    if (countdown) {
      parts.push(
        parts.length > 0
          ? `Además, ${countdown}.`
          : `${countdown.charAt(0).toUpperCase()}${countdown.slice(1)}.`,
      );
    }
  }

  if (parts.length === 0 && totalPending > 0) {
    return totalPending === 1
      ? "Tenéis 1 cosa pendiente en listas, sin fecha concreta."
      : `Tenéis ${totalPending} cosas pendientes en listas, sin fecha concreta.`;
  }

  if (parts.length === 0) {
    return "Todo tranquilo por aquí 🦦";
  }

  return parts.join(" ");
}

export function buildCopilotContext(
  lists: SharedList[],
  referenceDate: Date = new Date(),
): CopilotContext {
  const pendingByList = getPendingByList(lists);
  const totalPending = pendingByList.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return {
    hoy: buildHoySummary(lists, referenceDate),
    pendingByList,
    upcomingEvents: getUpcomingEvents(referenceDate),
    totalPending,
    referenceDate,
  };
}

export function hasCopilotFocus(context: CopilotContext): boolean {
  return (
    context.hoy.today.length > 0 ||
    context.hoy.overdue.length > 0 ||
    context.upcomingEvents.length > 0 ||
    context.totalPending > 0
  );
}

export function buildCopilotBrief(context: CopilotContext): CopilotBrief {
  return {
    greeting: getCopilotGreeting(context.referenceDate),
    summary: buildSynthesisSummary(context),
  };
}

type ObservationCandidate = CopilotObservation & { score: number };

function synthesisMentionsWedding(context: CopilotContext): boolean {
  const wedding = getWeddingEvent(context.upcomingEvents);
  if (!wedding) {
    return false;
  }

  return context.upcomingEvents[0]?.id === "wedding";
}

function buildObservationCandidates(
  context: CopilotContext,
  lists: SharedList[],
): ObservationCandidate[] {
  const candidates: ObservationCandidate[] = [];
  const wedding = getWeddingEvent(context.upcomingEvents);
  const mentionsWedding = synthesisMentionsWedding(context);

  const busiest = getBusiestListGroup(context.pendingByList);

  if (busiest && busiest.items.length >= BUSIEST_LIST_THRESHOLD) {
    candidates.push({
      icon: busiest.listIcon,
      text:
        busiest.items.length === 1
          ? `${busiest.listName} tiene 1 pendiente.`
          : `${busiest.listName} tiene ${busiest.items.length} pendientes.`,
      priority: 1,
      tier: "primary",
      score: 90 + busiest.items.length,
    });
  }

  const nextDaysItems = getPendingItemsDueNextDays(
    lists,
    context.referenceDate,
    NEXT_DAYS_WINDOW,
  );

  if (nextDaysItems.length >= NEXT_DAYS_THRESHOLD) {
    candidates.push({
      icon: "📅",
      text:
        nextDaysItems.length === 1
          ? "Tenéis 1 tarea pendiente para los próximos 7 días."
          : `Tenéis ${nextDaysItems.length} tareas pendientes para los próximos 7 días.`,
      priority: 2,
      tier: "primary",
      score: 80 + nextDaysItems.length,
    });
  }

  if (wedding && !mentionsWedding) {
    const countdown = formatEventCountdown(wedding, context.referenceDate);
    if (countdown) {
      candidates.push({
        icon: "💍",
        text: `${countdown.charAt(0).toUpperCase()}${countdown.slice(1)}.`,
        priority: 3,
        tier: "secondary",
        score: 70,
      });
    }
  }

  if (wedding) {
    const beforeWedding = getTasksBeforeEvent(
      lists,
      wedding.date,
      context.referenceDate,
    );

    if (beforeWedding.length > 0) {
      candidates.push({
        icon: "💍",
        text:
          beforeWedding.length === 1
            ? "Tenéis 1 tarea fechada antes de la boda."
            : `Tenéis ${beforeWedding.length} tareas fechadas antes de la boda.`,
        priority: 4,
        tier: "secondary",
        score: 75 + beforeWedding.length,
      });
    }
  }

  return candidates.sort((left, right) => right.score - left.score);
}

export function buildCopilotObservations(
  context: CopilotContext,
  lists: SharedList[],
): CopilotObservation[] {
  return buildObservationCandidates(context, lists)
    .slice(0, 2)
    .map(({ score: _score, ...observation }) => observation);
}

function formatListGroup(group: CopilotPendingListGroup, itemLimit: number): string[] {
  const lines = [`${group.listIcon} ${group.listName}`];
  const visibleItems = group.items.slice(0, itemLimit);

  lines.push(...visibleItems.map((item) => `• ${item.text}`));

  if (group.items.length > itemLimit) {
    lines.push(`…y ${group.items.length - itemLimit} más.`);
  }

  return lines;
}

export function answerCopilotQuestion(
  question: CopilotQuickQuestion,
  context: CopilotContext,
  lists: SharedList[],
): string {
  switch (question) {
    case "pending":
      return answerPendingQuestion(context);
    case "overdue":
      return answerOverdueQuestion(context);
    case "upcoming":
      return answerUpcomingQuestion(context, lists);
    case "busiestList":
      return answerBusiestListQuestion(context);
    case "beforeWedding":
      return answerBeforeWeddingQuestion(context, lists);
  }
}

function answerOverdueQuestion(context: CopilotContext): string {
  const { overdue } = context.hoy;

  if (overdue.length === 0) {
    return "No hay nada vencido.";
  }

  const lines = [
    overdue.length === 1
      ? "Tenéis 1 tarea vencida:"
      : `Tenéis ${overdue.length} tareas vencidas:`,
    "",
    ...overdue.slice(0, RESPONSE_ITEM_LIMIT).map((task) => `• ${task.item.text}`),
  ];

  if (overdue.length > RESPONSE_ITEM_LIMIT) {
    lines.push(`…y ${overdue.length - RESPONSE_ITEM_LIMIT} más.`);
  }

  return lines.join("\n").trim();
}

function answerPendingQuestion(context: CopilotContext): string {
  if (context.totalPending === 0) {
    return "No tenéis nada pendiente en vuestras listas.";
  }

  const lines = [
    context.totalPending === 1
      ? "Tenéis 1 cosa pendiente:"
      : `Tenéis ${context.totalPending} cosas pendientes:`,
    "",
  ];

  for (const group of context.pendingByList) {
    lines.push(...formatListGroup(group, 3), "");
  }

  return lines.join("\n").trim();
}

function answerUpcomingQuestion(
  context: CopilotContext,
  lists: SharedList[],
): string {
  const { upcomingEvents } = context;
  const upcomingTasks = buildHoySummary(lists, context.referenceDate, 5).upcoming;
  const lines: string[] = [];

  if (upcomingEvents.length === 0 && upcomingTasks.length === 0) {
    return "No hay hitos ni tareas fechadas próximamente.";
  }

  if (upcomingEvents.length > 0) {
    lines.push("Próximos hitos:", "");

    upcomingEvents.slice(0, 3).forEach((event, index) => {
      const daysLabel = formatEventDaysRemaining(
        event.date,
        context.referenceDate,
      );

      if (index > 0) {
        lines.push("");
      }

      lines.push(`${event.icon} ${event.title}`);
      lines.push(formatCoupleEventDate(event.date));

      if (daysLabel) {
        lines.push(`${daysLabel}.`);
      }
    });
  }

  if (upcomingTasks.length > 0) {
    if (lines.length > 0) {
      lines.push("", "Próximas tareas con fecha:", "");
    } else {
      lines.push("Próximas tareas con fecha:", "");
    }

    lines.push(
      ...upcomingTasks
        .slice(0, RESPONSE_ITEM_LIMIT)
        .map((task) => `• ${task.item.text}`),
    );

    if (upcomingTasks.length > RESPONSE_ITEM_LIMIT) {
      lines.push(`…y ${upcomingTasks.length - RESPONSE_ITEM_LIMIT} más.`);
    }
  }

  return lines.join("\n").trim();
}

function answerBusiestListQuestion(context: CopilotContext): string {
  const busiest = getBusiestListGroup(context.pendingByList);

  if (!busiest) {
    return "No hay listas con tareas pendientes.";
  }

  const tiedGroups = context.pendingByList.filter(
    (group) => group.items.length === busiest.items.length,
  );

  if (tiedGroups.length > 1) {
    const names = tiedGroups.map((group) => `${group.listIcon} ${group.listName}`);
    return `Las listas más cargadas están empatadas con ${busiest.items.length} pendientes: ${names.join(", ")}.`;
  }

  const lines = [
    `${busiest.listIcon} ${busiest.listName} es la lista más cargada, con ${busiest.items.length} pendientes:`,
    "",
    ...busiest.items.slice(0, RESPONSE_ITEM_LIMIT).map((item) => `• ${item.text}`),
  ];

  if (busiest.items.length > RESPONSE_ITEM_LIMIT) {
    lines.push(`…y ${busiest.items.length - RESPONSE_ITEM_LIMIT} más.`);
  }

  return lines.join("\n").trim();
}

function answerBeforeWeddingQuestion(
  context: CopilotContext,
  lists: SharedList[],
): string {
  const wedding = getWeddingEvent(context.upcomingEvents);

  if (!wedding) {
    return "No hay una boda próxima en el calendario.";
  }

  const tasks = getTasksBeforeEvent(lists, wedding.date, context.referenceDate);
  const countdown = formatEventCountdown(wedding, context.referenceDate);

  if (tasks.length === 0) {
    return countdown
      ? `No hay tareas fechadas antes de la boda. ${countdown.charAt(0).toUpperCase()}${countdown.slice(1)}.`
      : "No hay tareas fechadas antes de la boda.";
  }

  const lines = [
    tasks.length === 1
      ? "Tenéis 1 tarea fechada antes de la boda:"
      : `Tenéis ${tasks.length} tareas fechadas antes de la boda:`,
    "",
    ...tasks.slice(0, RESPONSE_ITEM_LIMIT).map((task) => `• ${task.text}`),
  ];

  if (tasks.length > RESPONSE_ITEM_LIMIT) {
    lines.push(`…y ${tasks.length - RESPONSE_ITEM_LIMIT} más.`);
  }

  if (countdown) {
    lines.push("", `${countdown.charAt(0).toUpperCase()}${countdown.slice(1)}.`);
  }

  return lines.join("\n").trim();
}

export const COPILOT_QUICK_QUESTIONS: Array<{
  id: CopilotQuickQuestion;
  label: string;
}> = [
  { id: "pending", label: "¿Qué tenemos pendiente?" },
  { id: "overdue", label: "¿Qué está vencido?" },
  { id: "upcoming", label: "¿Qué viene próximamente?" },
  { id: "busiestList", label: "¿Qué lista está más cargada?" },
  { id: "beforeWedding", label: "¿Qué tenemos antes de la boda?" },
];
