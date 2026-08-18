<<<<<<< Updated upstream
﻿"use client";
=======
<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

import type { SettingsCasaView } from "@/lib/services/settings.service";
import { registerCleaning } from "@/lib/services/settings.service";
import { SettingsButton } from "./settings-field";
import { SettingsSection } from "./settings-section";

type CasaSettingsSectionProps = {
  data: SettingsCasaView;
};

export function CasaSettingsSection({ data }: CasaSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🏡"
      title="Villa Barriguita"
<<<<<<< Updated upstream
      summary={data.summary}
=======
<<<<<<< HEAD
      summary={`${data.itemLabel} · ${data.lastCleaningLabel}`}
=======
      summary={data.summary}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      delay={160}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
          {data.itemLabel}
        </p>

        <p className="text-xs font-light tracking-[-0.01em] text-white/35">
<<<<<<< Updated upstream
          {data.copy.lastCleaning}
=======
<<<<<<< HEAD
          Última limpieza
=======
          {data.copy.lastCleaning}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/55">
          {data.lastCleaningLabel}
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/35">
          {data.daysElapsedLabel}
        </p>

        <div className="mt-4">
          <SettingsButton onClick={registerCleaning}>
            <span aria-hidden>✓</span>
            {data.markDoneLabel}
          </SettingsButton>
        </div>
      </div>
    </SettingsSection>
  );
}
