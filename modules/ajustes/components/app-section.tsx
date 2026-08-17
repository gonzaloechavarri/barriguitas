import { getFamilyConfig } from "@/lib/data/providers/local";
import { SettingsSection } from "./settings-section";

export function AppSettingsSection() {
  const { ajustes } = getFamilyConfig();

  return (
    <SettingsSection
      icon="⚙️"
      title="Aplicación"
      summary={`Versión ${ajustes.app.version}`}
      delay={400}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-light tracking-[-0.01em] text-white/35">
            Versión
          </p>
          <p className="mt-2 text-sm font-light tracking-[-0.01em] text-white/55">
            {ajustes.app.version}
          </p>
        </div>

        <p className="text-xs font-light tracking-[-0.01em] text-white/25">
          {ajustes.app.tagline}
        </p>
      </div>
    </SettingsSection>
  );
}
