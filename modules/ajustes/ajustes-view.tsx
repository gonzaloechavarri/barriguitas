"use client";

import { useFamilyConfig } from "@/lib/data/store/barriguitas-store";
import { AgendaSettingsSection } from "./components/agenda-section";
import { AppSettingsSection } from "./components/app-section";

export function AjustesView() {
  const { ajustes } = useFamilyConfig();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <header className="mb-8 opacity-0 animate-content-enter">
        <h2 className="text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-[1.625rem]">
          Ajustes
        </h2>
        <p className="mt-3 text-sm font-light tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]">
          {ajustes.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:gap-5">
        <AgendaSettingsSection />
        <AppSettingsSection />
      </div>
    </div>
  );
}
