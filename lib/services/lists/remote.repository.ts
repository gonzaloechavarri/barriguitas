import type { SupabaseClient } from "@supabase/supabase-js";
import type { SharedList } from "@/lib/data/types/lists";
import type { Database } from "@/lib/supabase/types";
import { buildSharedLists } from "./mappers";
import { seedDemoListsIfEmpty } from "./seed";

function createId(prefix: "list" | "item"): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

export async function fetchSharedLists(
  client: SupabaseClient<Database>,
): Promise<SharedList[]> {
  await seedDemoListsIfEmpty(client);

  const [listsResult, itemsResult] = await Promise.all([
    client.from("shared_lists").select("*"),
    client.from("shared_list_items").select("*"),
  ]);

  if (listsResult.error) {
    throw listsResult.error;
  }

  if (itemsResult.error) {
    throw itemsResult.error;
  }

  return buildSharedLists(listsResult.data ?? [], itemsResult.data ?? []);
}

export async function createSharedList(
  client: SupabaseClient<Database>,
  name: string,
  icon: string,
): Promise<string> {
  const id = createId("list");
  const now = new Date().toISOString();

  const { error } = await client.from("shared_lists").insert({
    id,
    name,
    icon,
    created_at: now,
    updated_at: now,
  });

  if (error) {
    throw error;
  }

  return id;
}

export async function deleteSharedList(
  client: SupabaseClient<Database>,
  listId: string,
): Promise<void> {
  const { error } = await client.from("shared_lists").delete().eq("id", listId);

  if (error) {
    throw error;
  }
}

export async function addSharedListItem(
  client: SupabaseClient<Database>,
  listId: string,
  text: string,
): Promise<string> {
  const id = createId("item");
  const now = new Date().toISOString();

  const { error } = await client.from("shared_list_items").insert({
    id,
    list_id: listId,
    text,
    completed: false,
    created_at: now,
    completed_at: null,
    updated_at: now,
  });

  if (error) {
    throw error;
  }

  return id;
}

export async function setSharedListItemCompleted(
  client: SupabaseClient<Database>,
  itemId: string,
  completed: boolean,
): Promise<void> {
  const now = new Date().toISOString();

  const { error } = await client
    .from("shared_list_items")
    .update({
      completed,
      completed_at: completed ? now : null,
      updated_at: now,
    })
    .eq("id", itemId);

  if (error) {
    throw error;
  }
}
