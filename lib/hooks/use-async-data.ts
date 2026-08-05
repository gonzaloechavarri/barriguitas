"use client";

import { useEffect, useState } from "react";

export function useAsyncData<T>(loader: () => Promise<T>): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loader().then((result) => {
      if (!cancelled) {
        setData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loader]);

  return data;
}
