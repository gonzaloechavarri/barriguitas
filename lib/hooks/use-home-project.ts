"use client";

import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import {
  addHomeCriterion,
  updateHomeCriterion,
  updateHomeNextStep,
  updateHomePhase,
} from "@/lib/services/settings.service";

export function useHomeProject() {
  const house = useBarriguitasStore().house;

  return {
    city: house.city,
    phases: house.phases,
    phase: house.phase,
    nextStep: house.nextStep,
    criteria: house.criteria,
    setPhase: updateHomePhase,
    setNextStep: updateHomeNextStep,
    updateCriterion: updateHomeCriterion,
    addCriterion: addHomeCriterion,
  };
}
