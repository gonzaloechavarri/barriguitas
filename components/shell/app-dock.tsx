"use client";

import { getDockModules } from "@/lib/modules/registry";
import { useModuleNavigation } from "@/lib/navigation/module-context";
import type { ModuleDefinition } from "@/lib/modules/types";

export function AppDock() {
  const dockModules = getDockModules();

  return (
    <nav
      aria-label="Módulos de Barriguitas"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-5 sm:pb-6"
    >
      <div className="pointer-events-auto flex items-end gap-1 rounded-[22px] border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150 sm:gap-1.5 sm:px-3 sm:py-2.5">
        {dockModules.map((module) => (
          <DockItem key={module.id} module={module} />
        ))}
      </div>
    </nav>
  );
}

type DockItemProps = {
  module: ModuleDefinition;
};

function DockItem({ module }: DockItemProps) {
  const { activeModuleId, setActiveModule } = useModuleNavigation();
  const isActive = activeModuleId === module.id;

  return (
    <button
      type="button"
      onClick={() => setActiveModule(module.id)}
      aria-label={module.title}
      aria-current={isActive ? "page" : undefined}
      className="group relative flex flex-col items-center px-1.5 py-1 sm:px-2"
    >
      <span
        className={`flex items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110 ${
          isActive ? "scale-110 -translate-y-0.5" : "scale-100"
        }`}
      >
        <span
          className={`text-[1.65rem] leading-none sm:text-[1.85rem] ${
            isActive ? "drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" : ""
          }`}
          role="img"
          aria-hidden
        >
          {module.icon}
        </span>
      </span>

      <span
        aria-hidden
        className={`mt-1.5 h-1 w-1 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-white/70 scale-100 opacity-100"
            : "bg-white/0 scale-0 opacity-0 group-hover:bg-white/30 group-hover:scale-75 group-hover:opacity-100"
        }`}
      />
    </button>
  );
}
