<<<<<<< Updated upstream
﻿"use client";
=======
<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

import { useState } from "react";
import type { SettingsMilestoneView } from "@/lib/services/settings.service";
import {
  addMilestone,
  completeMilestone,
  deleteMilestone,
  moveMilestone,
  updateMilestoneTitle,
} from "@/lib/services/settings.service";
import {
  SettingsButton,
  SettingsInput,
  SettingsTextButton,
} from "./settings-field";

type MilestonesEditorProps = {
  milestones: SettingsMilestoneView[];
<<<<<<< Updated upstream
  copy: {
    milestonesTitle: string;
    addMilestone: string;
    addMilestonePlaceholder: string;
    completeMilestone: string;
    deleteMilestone: string;
  };
};

export function MilestonesEditor({ milestones, copy }: MilestonesEditorProps) {
=======
<<<<<<< HEAD
};

export function MilestonesEditor({ milestones }: MilestonesEditorProps) {
=======
  copy: {
    milestonesTitle: string;
    addMilestone: string;
    addMilestonePlaceholder: string;
    completeMilestone: string;
    deleteMilestone: string;
  };
};

export function MilestonesEditor({ milestones, copy }: MilestonesEditorProps) {
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-light tracking-[-0.01em] text-white/35">
<<<<<<< Updated upstream
          {copy.milestonesTitle}
=======
<<<<<<< HEAD
          Hitos
=======
          {copy.milestonesTitle}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
        </p>

        <ul className="mt-3 flex flex-col gap-3">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <SettingsInput
                  value={milestone.title}
                  onChange={(event) =>
                    updateMilestoneTitle(milestone.id, event.target.value)
                  }
                />

                <div className="flex shrink-0 flex-col gap-1.5 pt-1">
                  <SettingsTextButton
                    aria-label="Subir prioridad"
                    disabled={index === 0}
                    onClick={() => moveMilestone(milestone.id, "up")}
                  >
                    ↑
                  </SettingsTextButton>
                  <SettingsTextButton
                    aria-label="Bajar prioridad"
                    disabled={index === milestones.length - 1}
                    onClick={() => moveMilestone(milestone.id, "down")}
                  >
                    ↓
                  </SettingsTextButton>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
<<<<<<< Updated upstream
                <SettingsTextButton
                  onClick={() => completeMilestone(milestone.id)}
                >
                  {copy.completeMilestone}
                </SettingsTextButton>
=======
<<<<<<< HEAD
                <SettingsTextButton onClick={() => completeMilestone(milestone.id)}>
                  ✓ Completado
                </SettingsTextButton>
                <SettingsTextButton onClick={() => deleteMilestone(milestone.id)}>
                  Eliminar
=======
                <SettingsTextButton
                  onClick={() => completeMilestone(milestone.id)}
                >
                  {copy.completeMilestone}
                </SettingsTextButton>
>>>>>>> Stashed changes
                <SettingsTextButton
                  onClick={() => deleteMilestone(milestone.id)}
                >
                  {copy.deleteMilestone}
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
                </SettingsTextButton>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-xs font-light tracking-[-0.01em] text-white/35">
<<<<<<< Updated upstream
            {copy.addMilestone}
          </span>
          <SettingsInput
            value={draft}
            placeholder={copy.addMilestonePlaceholder}
=======
<<<<<<< HEAD
            Añadir hito
          </span>
          <SettingsInput
            value={draft}
            placeholder="Nuevo hito"
=======
            {copy.addMilestone}
          </span>
          <SettingsInput
            value={draft}
            placeholder={copy.addMilestonePlaceholder}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addMilestone(draft);
                setDraft("");
              }
            }}
          />
        </label>

        <SettingsButton
          onClick={() => {
            addMilestone(draft);
            setDraft("");
          }}
        >
<<<<<<< Updated upstream
          {copy.addMilestone}
=======
<<<<<<< HEAD
          Añadir
=======
          {copy.addMilestone}
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
        </SettingsButton>
      </div>
    </div>
  );
}
