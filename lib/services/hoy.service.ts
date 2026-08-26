import type { SharedList, SharedListItem } from "@/lib/data/types/lists";
import {
  isDueDateOverdue,
  isDueDateToday,
  formatHoyDateLabel,
} from "@/lib/data/utils/dates";
import { getPersonalFamilyGreeting } from "@/lib/services/greeting.service";
import {
  getItemsDueToday,
  getOverdueItems,
  getPendingItemsDueThisWeek,
  getPendingItemsWithoutDueDate,
  getUpcomingItems,
} from "@/lib/services/lists.service";

export type HoyTask = {
  item: SharedListItem;
  listId: string;
  listName: string;
  listIcon: string;
};

export type HoySummary = {
  dateLabel: string;
  personalGreeting: string;
  weekContextLine: string;
  today: HoyTask[];
  overdue: HoyTask[];
  upcoming: HoyTask[];
};

function formatUndatedSuffix(count: number): string {
  return count === 1 ? "1 sin fecha" : `${count} sin fecha`;
}

/** Línea contextual de carga semanal para ☀️ Hoy. */
export function formatHoyWeekContextLine(
  weeklyCount: number,
  undatedCount: number,
): string {
  let main: string;

  if (weeklyCount <= 2) {
    main = "Semana tranquila.";
  } else if (weeklyCount <= 5) {
    main =
      weeklyCount === 1
        ? "Esta semana: 1 pendiente"
        : `Esta semana: ${weeklyCount} pendientes`;
  } else if (weeklyCount <= 8) {
    main = `La semana viene cargada · ${weeklyCount} pendientes`;
  } else {
    main = `Ojo, se están acumulando · ${weeklyCount} pendientes`;
  }

  if (undatedCount <= 0) {
    return main;
  }

  const undated = formatUndatedSuffix(undatedCount);

  if (weeklyCount <= 2) {
    return `Semana tranquila · ${undated}`;
  }

  return `${main} · ${undated}`;
}

function flattenLists(lists: SharedList[]): HoyTask[] {
  return lists.flatMap((list) =>
    list.items.map((item) => ({
      item,
      listId: list.id,
      listName: list.name,
      listIcon: list.icon,
    })),
  );
}

function mapItemsToTasks(
  lists: SharedList[],
  items: SharedListItem[],
): HoyTask[] {
  const itemIds = new Set(items.map((item) => item.id));
  return flattenLists(lists).filter((task) => itemIds.has(task.item.id));
}

/** Agrupa tareas pendientes con fecha desde Listas para la vista Hoy. */
export function buildHoySummary(
  lists: SharedList[],
  referenceDate: Date = new Date(),
  upcomingLimit = 5,
): HoySummary {
  const allItems = lists.flatMap((list) => list.items);

  const todayItems = getItemsDueToday(allItems, referenceDate);
  const overdueItems = getOverdueItems(allItems, referenceDate).sort(
    (left, right) => left.dueDate!.localeCompare(right.dueDate!),
  );
  const upcomingItems = getUpcomingItems(allItems, referenceDate).slice(
    0,
    upcomingLimit,
  );
  const weeklyCount = getPendingItemsDueThisWeek(allItems, referenceDate).length;
  const undatedCount = getPendingItemsWithoutDueDate(allItems).length;

  return {
    dateLabel: formatHoyDateLabel(referenceDate),
    personalGreeting: getPersonalFamilyGreeting(referenceDate),
    weekContextLine: formatHoyWeekContextLine(weeklyCount, undatedCount),
    today: mapItemsToTasks(lists, todayItems),
    overdue: mapItemsToTasks(lists, overdueItems),
    upcoming: mapItemsToTasks(lists, upcomingItems),
  };
}

/** Comprueba si hay alguna tarea relevante para mostrar en Hoy. */
export function hasHoyContent(summary: HoySummary): boolean {
  return (
    summary.today.length > 0 ||
    summary.overdue.length > 0 ||
    summary.upcoming.length > 0
  );
}
