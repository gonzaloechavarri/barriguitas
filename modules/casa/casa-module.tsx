"use client";

import { useCasaCare } from "@/lib/hooks/use-casa-care";
import { CasaView } from "./casa-view";

export function CasaModule() {
  const {
    cuidado,
    nuevoHogar,
    mantenimiento,
    completedAt,
    feedback,
    markLimpiezaExteriorDone,
  } = useCasaCare();

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <CasaView
        cuidado={cuidado}
        nuevoHogar={nuevoHogar}
        mantenimiento={mantenimiento}
        limpiezaExteriorCompletedAt={completedAt}
        feedback={feedback}
        onMarkLimpiezaExteriorDone={markLimpiezaExteriorDone}
      />
    </div>
  );
}
