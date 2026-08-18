<<<<<<< Updated upstream
﻿"use client";
=======
<<<<<<< HEAD
"use client";
=======
﻿"use client";
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes

import type { SettingsNosotrosView } from "@/lib/services/settings.service";
import { updateTrip, updateWeddingDate } from "@/lib/services/settings.service";
import { MilestonesEditor } from "./milestones-editor";
import {
  SettingsDivider,
  SettingsField,
  SettingsInput,
} from "./settings-field";
import { SettingsSection } from "./settings-section";

type NosotrosSettingsSectionProps = {
  data: SettingsNosotrosView;
};

export function NosotrosSettingsSection({ data }: NosotrosSettingsSectionProps) {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  const topMilestone = data.milestones[0]?.title ?? "Sin hitos pendientes";

=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  return (
    <SettingsSection
      icon="❤️"
      title="Nosotros"
<<<<<<< Updated upstream
      summary={data.summary}
      delay={80}
    >
      <div className="flex flex-col gap-4">
        <SettingsField label={data.copy.weddingDate}>
=======
<<<<<<< HEAD
      summary={topMilestone}
      delay={80}
    >
      <div className="flex flex-col gap-4">
        <SettingsField label="Fecha de la boda">
=======
      summary={data.summary}
      delay={80}
    >
      <div className="flex flex-col gap-4">
        <SettingsField label={data.copy.weddingDate}>
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
          <SettingsInput
            type="date"
            value={data.weddingDate}
            onChange={(event) => updateWeddingDate(event.target.value)}
          />
        </SettingsField>

        <SettingsDivider />

<<<<<<< Updated upstream
        <SettingsField label={data.copy.tripTitle}>
=======
<<<<<<< HEAD
        <SettingsField label="Viaje · título">
=======
        <SettingsField label={data.copy.tripTitle}>
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
          <SettingsInput
            value={data.tripTitle}
            onChange={(event) =>
              updateTrip({
                cardTitle: event.target.value,
                destination: data.tripDestination,
                startDate: data.tripStartDate,
              })
            }
          />
        </SettingsField>

<<<<<<< Updated upstream
        <SettingsField label={data.copy.tripDestination}>
=======
<<<<<<< HEAD
        <SettingsField label="Viaje · destinos">
=======
        <SettingsField label={data.copy.tripDestination}>
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
          <SettingsInput
            value={data.tripDestination}
            onChange={(event) =>
              updateTrip({
                cardTitle: data.tripTitle,
                destination: event.target.value,
                startDate: data.tripStartDate,
              })
            }
          />
        </SettingsField>

<<<<<<< Updated upstream
        <SettingsField label={data.copy.tripStartDate}>
=======
<<<<<<< HEAD
        <SettingsField label="Viaje · fecha de inicio">
=======
        <SettingsField label={data.copy.tripStartDate}>
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
          <SettingsInput
            type="date"
            value={data.tripStartDate}
            onChange={(event) =>
              updateTrip({
                cardTitle: data.tripTitle,
                destination: data.tripDestination,
                startDate: event.target.value,
              })
            }
          />
        </SettingsField>

        <SettingsDivider />

<<<<<<< Updated upstream
        <MilestonesEditor milestones={data.milestones} copy={data.copy} />
=======
<<<<<<< HEAD
        <MilestonesEditor milestones={data.milestones} />
=======
        <MilestonesEditor milestones={data.milestones} copy={data.copy} />
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
      </div>
    </SettingsSection>
  );
}
