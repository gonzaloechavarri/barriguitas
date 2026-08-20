import type { SharedList, SharedListItem } from "@/lib/data/types/lists";
import {
  isDueDateOverdue,
  isDueDateToday,
  formatHoyDateLabel,
} from "@/lib/data/utils/dates";
import {
  getItemsDueToday,
  getOverdueItems,
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
  today: HoyTask[];
  overdue: HoyTask[];
  upcoming: HoyTask[];
};

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

  return {
    dateLabel: formatHoyDateLabel(referenceDate),
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
