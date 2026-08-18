<<<<<<< Updated upstream
﻿"use client";
=======
<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

import { useMemo } from "react";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import { buildSettingsView } from "@/lib/services/settings.service";
import { AjustesView } from "./ajustes-view";

export function AjustesModule() {
  const snapshot = useBarriguitasStore();
  const settings = useMemo(() => buildSettingsView(snapshot), [snapshot]);

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <AjustesView settings={settings} />
    </div>
  );
}
