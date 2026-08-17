import type { SettingsAgendaView } from "@/lib/services/settings.service";
import { SettingsSection } from "./settings-section";

type AgendaSettingsSectionProps = {
  data: SettingsAgendaView;
};

export function AgendaSettingsSection({ data }: AgendaSettingsSectionProps) {
  return (
    <SettingsSection
      icon="📅"
      title="Agenda"
      summary={data.summary}
      delay={320}
    >
      <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35">
        {data.placeholder}
      </p>
    </SettingsSection>
  );
}
