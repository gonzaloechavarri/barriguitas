import { cardMotionClasses } from "@/components/motion/card-motion";
import type { SettingsView } from "@/lib/services/settings.service";
import { AgendaSettingsSection } from "./components/agenda-section";
import { AhorroSettingsSection } from "./components/ahorro-section";
import { AppSettingsSection } from "./components/app-section";
import { CasaSettingsSection } from "./components/casa-section";
import { CopilotoSettingsSection } from "./components/copiloto-section";
import { NosotrosSettingsSection } from "./components/nosotros-section";

type AjustesViewProps = {
  settings: SettingsView;
};

export function AjustesView({ settings }: AjustesViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <header className="mb-8 opacity-0 animate-content-enter">
        <h2 className="text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-[1.625rem]">
          {settings.title}
        </h2>
        <p className="mt-3 text-sm font-light tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]">
          {settings.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:gap-5">
        <article
          className={`rounded-3xl border border-white/[0.05] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md backdrop-saturate-150 ${cardMotionClasses}`}
          style={{ animationDelay: "160ms" }}
        >
          <p className="px-6 py-4 text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35 sm:px-7">
            {settings.notice}
          </p>
        </article>

        <NosotrosSettingsSection data={settings.nosotros} />
        <CasaSettingsSection data={settings.casa} />
        <AhorroSettingsSection data={settings.ahorro} />
        <AgendaSettingsSection data={settings.agenda} />
        <CopilotoSettingsSection data={settings.copiloto} />
        <AppSettingsSection data={settings.app} />
      </div>
    </div>
  );
}
