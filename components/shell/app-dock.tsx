"use client";

import { getDockModules } from "@/lib/modules/registry";
import { useModuleNavigation } from "@/lib/navigation/module-context";
import type { ModuleDefinition } from "@/lib/modules/types";

export function AppDock() {
  const dockModules = getDockModules();

  return (
    <nav
      aria-label="Módulos de Barriguitas"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]"
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
        className={`flex items-center justify-center rounded-xl motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-safe:group-hover:-translate-y-0.5 ${
          isActive
            ? "-translate-y-0.5 scale-[1.04]"
            : "translate-y-0 scale-100 opacity-80"
        }`}
      >
        <span
          className={`text-[1.65rem] leading-none motion-safe:transition-[filter] motion-safe:duration-300 sm:text-[1.85rem] ${
            isActive ? "brightness-110" : "brightness-100"
          }`}
          role="img"
          aria-hidden
        >
          {module.icon}
        </span>
      </span>

      <span
        aria-hidden
        className={`mt-1.5 h-1 w-1 rounded-full motion-safe:transition-[transform,opacity,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isActive
            ? "scale-100 bg-white/60 opacity-100"
            : "scale-75 bg-white/0 opacity-0 motion-safe:group-hover:bg-white/25 motion-safe:group-hover:opacity-60"
        }`}
      />
    </button>
  );
}
