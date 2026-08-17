import { getFamilyConfig } from "@/lib/data/providers/local";
import { SettingsSection } from "./settings-section";

export function AgendaSettingsSection() {
  const { ajustes } = getFamilyConfig();

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
