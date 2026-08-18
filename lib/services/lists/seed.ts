import { listsData } from "@/data/lists";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export async function seedDemoListsIfEmpty(
  client: SupabaseClient<Database>,
): Promise<void> {
  const { count, error: countError } = await client
    .from("shared_lists")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw countError;
  }

  if (count && count > 0) {
    return;
  }

  const now = new Date().toISOString();

  for (const list of listsData.lists) {
    const { error: listError } = await client.from("shared_lists").upsert(
      {
        id: list.id,
        name: list.name,
        icon: list.icon,
        created_at: list.createdAt,
        updated_at: now,
      },
      { onConflict: "id", ignoreDuplicates: true },
    );

    if (listError) {
      throw listError;
    }

    if (list.items.length === 0) {
      continue;
    }

    const { error: itemsError } = await client.from("shared_list_items").upsert(
      list.items.map((item) => ({
        id: item.id,
        list_id: list.id,
        text: item.text,
        completed: item.completed,
        created_at: item.createdAt,
        completed_at: item.completedAt,
        updated_at: now,
      })),
      { onConflict: "id", ignoreDuplicates: true },
    );

    if (itemsError) {
      throw itemsError;
    }
  }
}
