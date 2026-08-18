import { getBarriguitasSnapshot } from "@/lib/data/store/snapshot";
import { updateBarriguitas } from "@/lib/data/store/barriguitas-store";
import type { DemoMemberId, SharedList } from "@/lib/data/types/lists";

/** Miembro activo demo hasta que exista autenticación. */
export const DEFAULT_DEMO_MEMBER: DemoMemberId = "gonzalo";

export function getListsData() {
  return getBarriguitasSnapshot().lists;
}

export function getPendingCount(list: SharedList): number {
  return list.items.filter((item) => !item.completed).length;
}

export function pendingLabel(count: number): string {
  if (count === 1) return "1 pendiente";
  return `${count} pendientes`;
}

function createItemId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `item-${crypto.randomUUID()}`;
  }
  return `item-${Date.now()}`;
}

export function toggleListItem(
  listId: string,
  itemId: string,
  memberId: DemoMemberId = DEFAULT_DEMO_MEMBER,
): void {
  updateBarriguitas((current) => ({
    ...current,
    lists: {
      ...current.lists,
      lists: current.lists.lists.map((list) =>
        list.id !== listId
          ? list
          : {
              ...list,
              items: list.items.map((item) =>
                item.id !== itemId
                  ? item
                  : item.completed
                    ? {
                        ...item,
                        completed: false,
                        completedAt: null,
                        completedBy: null,
                      }
                    : {
                        ...item,
                        completed: true,
                        completedAt: new Date().toISOString(),
                        completedBy: memberId,
                      },
              ),
            },
      ),
    },
  }));
}

export function addListItem(
  listId: string,
  text: string,
  memberId: DemoMemberId = DEFAULT_DEMO_MEMBER,
): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  const now = new Date().toISOString();

  updateBarriguitas((current) => ({
    ...current,
    lists: {
      ...current.lists,
      lists: current.lists.lists.map((list) =>
        list.id !== listId
          ? list
          : {
              ...list,
              items: [
                ...list.items,
                {
                  id: createItemId(),
                  text: trimmed,
                  completed: false,
                  createdAt: now,
                  completedAt: null,
                  createdBy: memberId,
                  completedBy: null,
                },
              ],
            },
      ),
    },
  }));
}
