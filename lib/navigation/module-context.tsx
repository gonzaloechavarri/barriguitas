"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_MODULE_ID,
  getModule,
} from "@/lib/modules/registry";
import type { ModuleDefinition, ModuleId } from "@/lib/modules/types";

type ModuleNavigationContextValue = {
  activeModule: ModuleDefinition;
  activeModuleId: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  pendingListId: string | null;
  openList: (listId: string) => void;
  clearPendingListId: () => void;
};

const ModuleNavigationContext =
  createContext<ModuleNavigationContextValue | null>(null);

type ModuleNavigationProviderProps = {
  children: ReactNode;
  initialModuleId?: ModuleId;
};

export function ModuleNavigationProvider({
  children,
  initialModuleId = DEFAULT_MODULE_ID,
}: ModuleNavigationProviderProps) {
  const [activeModuleId, setActiveModuleId] =
    useState<ModuleId>(initialModuleId);
  const [pendingListId, setPendingListId] = useState<string | null>(null);

  const setActiveModule = useCallback((id: ModuleId) => {
    setActiveModuleId(id);
  }, []);

  const openList = useCallback((listId: string) => {
    setPendingListId(listId);
    setActiveModuleId("listas");
  }, []);

  const clearPendingListId = useCallback(() => {
    setPendingListId(null);
  }, []);

  const value = useMemo(
    () => ({
      activeModule: getModule(activeModuleId),
      activeModuleId,
      setActiveModule,
      pendingListId,
      openList,
      clearPendingListId,
    }),
    [
      activeModuleId,
      setActiveModule,
      pendingListId,
      openList,
      clearPendingListId,
    ],
  );

  return (
    <ModuleNavigationContext.Provider value={value}>
      {children}
    </ModuleNavigationContext.Provider>
  );
}

export function useModuleNavigation() {
  const context = useContext(ModuleNavigationContext);
  if (!context) {
    throw new Error(
      "useModuleNavigation must be used within ModuleNavigationProvider.",
    );
  }
  return context;
}
