"use client";

import { AppDock } from "@/components/shell/app-dock";
import { AppHeader } from "@/components/shell/app-header";
import { ModuleViewport } from "@/components/shell/module-viewport";
import { ModuleNavigationProvider } from "@/lib/navigation/module-context";

export function AppShell() {
  return (
    <ModuleNavigationProvider>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-barriguitas-bg">
        <Background />

        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col pb-28 pt-[env(safe-area-inset-top)]">
          <AppHeader />
          <ModuleViewport />
        </div>

        <AppDock />
      </div>
    </ModuleNavigationProvider>
  );
}

function Background() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(120,120,120,0.04),transparent)]"
      />
    </>
  );
}
