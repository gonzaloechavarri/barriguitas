<<<<<<< Updated upstream
﻿"use client";
=======
<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

import type { SettingsAppView } from "@/lib/services/settings.service";
import {
  exportDataPlaceholder,
  importDataPlaceholder,
} from "@/lib/services/settings.service";
import { SettingsButton } from "./settings-field";
import { SettingsSection } from "./settings-section";

type AppSettingsSectionProps = {
  data: SettingsAppView;
};

export function AppSettingsSection({ data }: AppSettingsSectionProps) {
  return (
    <SettingsSection
      icon="⚙️"
      title="Aplicación"
<<<<<<< Updated upstream
      summary={data.summary}
=======
<<<<<<< HEAD
      summary={`Versión ${data.version}`}
=======
      summary={data.summary}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      delay={400}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-light tracking-[-0.01em] text-white/35">
            Versión
          </p>
          <p className="mt-2 text-sm font-light tracking-[-0.01em] text-white/55">
            {data.version}
          </p>
        </div>

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
        <p className="text-xs font-light tracking-[-0.01em] text-white/25">
          {data.tagline}
        </p>

<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
        <div className="flex flex-wrap gap-3">
          <SettingsButton onClick={exportDataPlaceholder}>
            {data.exportLabel}
          </SettingsButton>
          <SettingsButton onClick={importDataPlaceholder}>
            {data.importLabel}
          </SettingsButton>
        </div>
      </div>
    </SettingsSection>
  );
}
