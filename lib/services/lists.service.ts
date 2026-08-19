import type { SharedList, SharedListItem } from "@/lib/data/types/lists";
import {
  isDueDateOverdue,
  isDueDateToday,
  parseIsoDate,
} from "@/lib/data/utils/dates";

export function getPendingCount(list: SharedList): number {
  return list.items.filter((item) => !item.completed).length;
}

export function pendingLabel(count: number): string {
  if (count === 1) return "1 pendiente";
  return `${count} pendientes`;
}

/** Normaliza elementos cacheados antes de la migración due_date. */
export function normalizeSharedLists(lists: SharedList[]): SharedList[] {
  return lists.map((list) => ({
    ...list,
    items: list.items.map((item) => ({
      ...item,
      dueDate: item.dueDate ?? null,
    })),
  }));
}

/** Consultas preparadas para el futuro módulo Hoy. */
export function getPendingItemsWithDueDate(
  items: SharedListItem[],
): SharedListItem[] {
  return items.filter((item) => !item.completed && item.dueDate !== null);
}

export function getItemsDueToday(
  items: SharedListItem[],
  referenceDate: Date = new Date(),
): SharedListItem[] {
  return getPendingItemsWithDueDate(items).filter(
    (item) => item.dueDate && isDueDateToday(item.dueDate, referenceDate),
  );
}

export function getOverdueItems(
  items: SharedListItem[],
  referenceDate: Date = new Date(),
): SharedListItem[] {
  return getPendingItemsWithDueDate(items).filter(
    (item) => item.dueDate && isDueDateOverdue(item.dueDate, referenceDate),
  );
}

export function getUpcomingItems(
  items: SharedListItem[],
  referenceDate: Date = new Date(),
): SharedListItem[] {
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return getPendingItemsWithDueDate(items)
    .filter((item) => {
      if (!item.dueDate) return false;
      const due = parseIsoDate(item.dueDate);
      return due.getTime() > today.getTime();
    })
    .sort((left, right) => {
      if (!left.dueDate || !right.dueDate) return 0;
      return left.dueDate.localeCompare(right.dueDate);
    });
}
