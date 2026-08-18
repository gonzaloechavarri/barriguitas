"use client";

import { useModuleNavigation } from "@/lib/navigation/module-context";

export function ModuleViewport() {
  const { activeModule } = useModuleNavigation();
  const ActiveModuleView = activeModule.component;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
      <div
        key={activeModule.id}
        className="flex flex-1 flex-col animate-module-enter motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      >
        <ActiveModuleView />
      </div>
    </main>
  );
}
