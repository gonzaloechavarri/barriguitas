"use client";

import { useMemo, useState } from "react";
import { useSharedLists } from "@/lib/hooks/use-shared-lists";
import { useBarriguitasStore } from "@/lib/data/store/barriguitas-store";
import {
  answerCopilotQuestion,
  buildCopilotBrief,
  buildCopilotContext,
  buildCopilotObservations,
  type CopilotQuickQuestion,
} from "@/lib/services/copilot/context.service";
import { IaView } from "./ia-view";

export function IaModule() {
  const snapshot = useBarriguitasStore();
  const { lists } = useSharedLists();
  const [activeQuestion, setActiveQuestion] =
    useState<CopilotQuickQuestion | null>(null);

  const context = useMemo(
    () => buildCopilotContext(lists),
    [lists, snapshot],
  );

  const brief = useMemo(() => buildCopilotBrief(context), [context]);

  const observations = useMemo(
    () => buildCopilotObservations(context, lists),
    [context, lists],
  );

  const response = useMemo(() => {
    if (!activeQuestion) {
      return null;
    }

    return answerCopilotQuestion(activeQuestion, context, lists);
  }, [activeQuestion, context, lists]);

  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <IaView
        brief={brief}
        observations={observations}
        response={response}
        activeQuestion={activeQuestion}
        onSelectQuestion={setActiveQuestion}
      />
    </div>
  );
}
