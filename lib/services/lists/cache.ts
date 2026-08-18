const CACHE_KEY = "barriguitas:lists-cache";

type ListsCachePayload = {
  lists: import("@/lib/data/types/lists").SharedList[];
  fetchedAt: string;
};

export function readListsCache(): ListsCachePayload | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ListsCachePayload;
  } catch {
    return null;
  }
}

export function writeListsCache(
  lists: import("@/lib/data/types/lists").SharedList[],
): void {
  if (typeof window === "undefined") {
    return;
  }

  const payload: ListsCachePayload = {
    lists,
    fetchedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export function clearLegacyListsOverrides(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage.getItem("barriguitas:data");
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!("lists" in parsed)) {
      return;
    }

    delete parsed.lists;
    window.localStorage.setItem("barriguitas:data", JSON.stringify(parsed));
  } catch {
    // Ignorar caché legacy corrupta.
  }
}
