import type { SharedList } from "@/lib/data/types/lists";

export function getPendingCount(list: SharedList): number {
  return list.items.filter((item) => !item.completed).length;
}

export function pendingLabel(count: number): string {
  if (count === 1) return "1 pendiente";
  return `${count} pendientes`;
}
