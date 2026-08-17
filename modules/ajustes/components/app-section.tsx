"use client";

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
      summary={`Versión ${data.version}`}
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
