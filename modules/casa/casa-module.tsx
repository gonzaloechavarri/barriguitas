"use client";

import { getFamilyConfig } from "@/lib/data/providers/local";
import { useCasaCare } from "@/lib/hooks/use-casa-care";
import { CasaView } from "./casa-view";

export function CasaModule() {
  const config = getFamilyConfig();
  const { casa } = config;
  const { completedAt, feedback, markLimpiezaExteriorDone } = useCasaCare(
    casa.cuidado.defaultDaysAgo,
  );

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <CasaView
        cuidado={casa.cuidado}
        nuevoHogar={casa.nuevoHogar}
        mantenimiento={casa.mantenimiento}
        limpiezaExteriorCompletedAt={completedAt}
        feedback={feedback}
        onMarkLimpiezaExteriorDone={markLimpiezaExteriorDone}
      />
    </div>
  );
}
