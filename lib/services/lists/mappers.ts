import type { SharedList, SharedListItem } from "@/lib/data/types/lists";
import type { SharedListItemRow, SharedListRow } from "@/lib/supabase/types";

export function mapItemRow(row: SharedListItemRow): SharedListItem {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    createdAt: row.created_at,
    completedAt: row.completed_at,
    dueDate: row.due_date ?? null,
  };
}

export function mapListRow(
  row: SharedListRow,
  items: SharedListItemRow[],
): SharedList {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    createdAt: row.created_at,
    items: items
      .filter((item) => item.list_id === row.id)
      .sort(
        (left, right) =>
          new Date(left.created_at).getTime() -
          new Date(right.created_at).getTime(),
      )
      .map(mapItemRow),
  };
}

export function buildSharedLists(
  listRows: SharedListRow[],
  itemRows: SharedListItemRow[],
): SharedList[] {
  return listRows
    .sort(
      (left, right) =>
        new Date(left.created_at).getTime() -
        new Date(right.created_at).getTime(),
    )
    .map((row) => mapListRow(row, itemRows));
}
