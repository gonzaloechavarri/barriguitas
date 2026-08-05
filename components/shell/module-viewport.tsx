"use client";

import { useModuleNavigation } from "@/lib/navigation/module-context";

export function ModuleViewport() {
  const { activeModule } = useModuleNavigation();
  const ActiveModuleView = activeModule.component;

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <div
        key={activeModule.id}
        className="flex flex-1 flex-col animate-module-enter"
      >
        <ActiveModuleView />
      </div>
    </main>
  );
}
