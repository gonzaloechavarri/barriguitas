<<<<<<< Updated upstream
﻿import type { SettingsAgendaView } from "@/lib/services/settings.service";
=======
<<<<<<< HEAD
import type { SettingsAgendaView } from "@/lib/services/settings.service";
=======
﻿import type { SettingsAgendaView } from "@/lib/services/settings.service";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
import { SettingsSection } from "./settings-section";

type AgendaSettingsSectionProps = {
  data: SettingsAgendaView;
};

export function AgendaSettingsSection({ data }: AgendaSettingsSectionProps) {
  return (
    <SettingsSection
      icon="📅"
      title="Agenda"
<<<<<<< Updated upstream
      summary={data.summary}
=======
<<<<<<< HEAD
      summary="Próximamente"
=======
      summary={data.summary}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      delay={320}
    >
      <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35">
        {data.placeholder}
      </p>
    </SettingsSection>
  );
}
