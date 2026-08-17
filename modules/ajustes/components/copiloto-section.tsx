import type { SettingsCopilotoView } from "@/lib/services/settings.service";
import { SettingsSection } from "./settings-section";

type CopilotoSettingsSectionProps = {
  data: SettingsCopilotoView;
};

export function CopilotoSettingsSection({ data }: CopilotoSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🤖"
      title="Copiloto"
      summary={data.summary}
      delay={360}
    >
      <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35">
        {data.placeholder}
      </p>
    </SettingsSection>
  );
}
