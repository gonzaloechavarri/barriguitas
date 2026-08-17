import { getFamilyConfig } from "@/lib/data/providers/local";
import { ModuleShell } from "@/components/modules/module-shell";

export function AjustesModule() {
  const { ajustes } = getFamilyConfig();

  return (
    <ModuleShell
      icon="⚙️"
      title="Ajustes"
      description={ajustes.subtitle}
    />
  );
}
