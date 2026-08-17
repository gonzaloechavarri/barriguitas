"use client";

import { useFamilyConfig } from "@/lib/data/store/barriguitas-store";
import { SettingsSection } from "./settings-section";

export function AgendaSettingsSection() {
  const { ajustes } = useFamilyConfig();

  return (
    <SettingsSection
      icon="📅"
      title="Agenda"
      summary={ajustes.agenda.summary}
      delay={320}
    >
      <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35">
        {ajustes.agenda.placeholder}
      </p>
    </SettingsSection>
  );
}
