"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SharedList } from "@/lib/data/types/lists";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  clearLegacyListsOverrides,
  readListsCache,
  writeListsCache,
} from "@/lib/services/lists/cache";
import {
  addSharedListItem,
  createSharedList,
  deleteSharedList,
  fetchSharedLists,
  setSharedListItemCompleted,
} from "@/lib/services/lists/remote.repository";

export type SharedListsStatus = "loading" | "ready" | "offline" | "error";

export type UseSharedListsResult = {
  lists: SharedList[];
  status: SharedListsStatus;
  syncError: string | null;
  lastSyncedAt: string | null;
  createList: (name: string, icon: string) => Promise<void>;
  deleteList: (listId: string) => Promise<void>;
  addListItem: (listId: string, text: string) => Promise<void>;
  toggleListItem: (listId: string, itemId: string) => Promise<void>;
  refresh: () => Promise<void>;
};

export function useSharedLists(): UseSharedListsResult {
  const [lists, setLists] = useState<SharedList[]>([]);
  const [status, setStatus] = useState<SharedListsStatus>("loading");
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const refreshLock = useRef(false);

  const refresh = useCallback(async () => {
    if (refreshLock.current) {
      return;
    }

    refreshLock.current = true;

    try {
      const client = getSupabaseClient();

      if (!client) {
        const cached = readListsCache();
        if (cached) {
          setLists(cached.lists);
          setLastSyncedAt(cached.fetchedAt);
        }

        setStatus("error");
        setSyncError(
          isSupabaseConfigured()
            ? "No se pudo conectar con Supabase."
            : "Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        );
        return;
      }

      const remoteLists = await fetchSharedLists(client);
      setLists(remoteLists);
      writeListsCache(remoteLists);
      const syncedAt = new Date().toISOString();
      setLastSyncedAt(syncedAt);
      setStatus("ready");
      setSyncError(null);
    } catch (error) {
      const cached = readListsCache();
      if (cached) {
        setLists(cached.lists);
        setLastSyncedAt(cached.fetchedAt);
        setStatus("offline");
      } else {
        setStatus("error");
      }

      setSyncError(
        error instanceof Error
          ? error.message
          : "No se pudieron sincronizar las listas.",
      );
    } finally {
      refreshLock.current = false;
    }
  }, []);

  useEffect(() => {
    clearLegacyListsOverrides();

    const cached = readListsCache();
    if (cached) {
      setLists(cached.lists);
      setLastSyncedAt(cached.fetchedAt);
    }

    void refresh();

    const client = getSupabaseClient();
    if (!client) {
      return;
    }

    const channel = client
      .channel("barriguitas-shared-lists")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shared_lists" },
        () => {
          void refresh();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shared_list_items" },
        () => {
          void refresh();
        },
      )
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, [refresh]);

  const runMutation = useCallback(
    async (operation: () => Promise<void>) => {
      const client = getSupabaseClient();

      if (!client) {
        setSyncError("Supabase no está disponible.");
        setStatus("error");
        return;
      }

      try {
        await operation();
        setSyncError(null);
        await refresh();
      } catch (error) {
        setSyncError(
          error instanceof Error
            ? error.message
            : "No se pudo sincronizar el cambio.",
        );

        if (readListsCache()) {
          setStatus("offline");
        } else {
          setStatus("error");
        }

        await refresh();
      }
    },
    [refresh],
  );

  const createList = useCallback(
    async (name: string, icon: string) => {
      const trimmed = name.trim();
      if (!trimmed) {
        return;
      }

      await runMutation(async () => {
        const client = getSupabaseClient();
        if (!client) {
          throw new Error("Supabase no está disponible.");
        }

        await createSharedList(client, trimmed, icon.trim() || "📝");
      });
    },
    [runMutation],
  );

  const deleteList = useCallback(
    async (listId: string) => {
      await runMutation(async () => {
        const client = getSupabaseClient();
        if (!client) {
          throw new Error("Supabase no está disponible.");
        }

        await deleteSharedList(client, listId);
      });
    },
    [runMutation],
  );

  const addListItem = useCallback(
    async (listId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      await runMutation(async () => {
        const client = getSupabaseClient();
        if (!client) {
          throw new Error("Supabase no está disponible.");
        }

        await addSharedListItem(client, listId, trimmed);
      });
    },
    [runMutation],
  );

  const toggleListItem = useCallback(
    async (listId: string, itemId: string) => {
      const list = lists.find((entry) => entry.id === listId);
      const item = list?.items.find((entry) => entry.id === itemId);

      if (!item) {
        return;
      }

      await runMutation(async () => {
        const client = getSupabaseClient();
        if (!client) {
          throw new Error("Supabase no está disponible.");
        }

        await setSharedListItemCompleted(client, itemId, !item.completed);
      });
    },
    [lists, runMutation],
  );

  return {
    lists,
    status,
    syncError,
    lastSyncedAt,
    createList,
    deleteList,
    addListItem,
    toggleListItem,
    refresh,
  };
}
