"use client";

import { useEffect } from "react";
import { notifyBarriguitasStoreChange } from "./barriguitas-store";
import { hydrateBarriguitasSnapshot } from "./snapshot";

export function BarriguitasStoreHydrator() {
  useEffect(() => {
    if (hydrateBarriguitasSnapshot()) {
      notifyBarriguitasStoreChange();
    }
  }, []);

  return null;
}
