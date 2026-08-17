import type { SettingsView } from "@/lib/services/settings.service";
import { AgendaSettingsSection } from "./components/agenda-section";
import { AhorroSettingsSection } from "./components/ahorro-section";
import { AppSettingsSection } from "./components/app-section";
import { CasaSettingsSection } from "./components/casa-section";
import { NosotrosSettingsSection } from "./components/nosotros-section";

type AjustesViewProps = {
  settings: SettingsView;
};

export function AjustesView({ settings }: AjustesViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-4 sm:gap-5">
        <NosotrosSettingsSection data={settings.nosotros} />
        <CasaSettingsSection data={settings.casa} />
        <AhorroSettingsSection data={settings.ahorro} />
        <AgendaSettingsSection data={settings.agenda} />
        <AppSettingsSection data={settings.app} />
      </div>
    </div>
  );
}
