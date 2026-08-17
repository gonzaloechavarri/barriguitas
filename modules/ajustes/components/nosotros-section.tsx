"use client";

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
  const topMilestone = data.milestones[0]?.title ?? "Sin hitos pendientes";

  return (
    <SettingsSection
      icon="❤️"
      title="Nosotros"
      summary={topMilestone}
      delay={80}
    >
      <div className="flex flex-col gap-4">
        <SettingsField label="Fecha de la boda">
          <SettingsInput
            type="date"
            value={data.weddingDate}
            onChange={(event) => updateWeddingDate(event.target.value)}
          />
        </SettingsField>

        <SettingsDivider />

        <SettingsField label="Viaje · título">
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

        <SettingsField label="Viaje · destinos">
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

        <SettingsField label="Viaje · fecha de inicio">
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

        <MilestonesEditor milestones={data.milestones} />
      </div>
    </SettingsSection>
  );
}
