"use client";

import { useHomeProject } from "@/lib/hooks/use-home-project";
import { CasaView } from "./casa-view";

export function CasaModule() {
  const project = useHomeProject();

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <CasaView
        city={project.city}
        phases={project.phases}
        phase={project.phase}
        nextStep={project.nextStep}
        criteria={project.criteria}
        onPhaseChange={project.setPhase}
        onNextStepChange={project.setNextStep}
        onCriterionChange={project.updateCriterion}
        onCriterionAdd={project.addCriterion}
      />
    </div>
  );
}
