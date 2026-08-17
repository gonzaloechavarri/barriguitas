"use client";

import type { SettingsAhorroView } from "@/lib/services/settings.service";
import type { StrategyDistribution } from "@/lib/data/types/editable";
import {
  updateWealthCurrentDistribution,
  updateWealthTarget,
} from "@/lib/services/settings.service";
import {
  SettingsDivider,
  SettingsField,
  SettingsInput,
} from "./settings-field";
import { SettingsSection } from "./settings-section";

type AhorroSettingsSectionProps = {
  data: SettingsAhorroView;
};

type DistributionFieldsProps = {
  title: string;
  values: StrategyDistribution;
  labels: SettingsAhorroView["labels"];
  onChange: (values: StrategyDistribution) => void;
};

function DistributionFields({
  title,
  values,
  labels,
  onChange,
}: DistributionFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-light tracking-[-0.01em] text-white/35">
        {title}
      </p>

      <SettingsField label={labels.acwi}>
        <SettingsInput
          type="number"
          min={0}
          max={100}
          value={values.acwi}
          onChange={(event) =>
            onChange({
              ...values,
              acwi: Number(event.target.value),
            })
          }
        />
      </SettingsField>

      <SettingsField label={labels.oro}>
        <SettingsInput
          type="number"
          min={0}
          max={100}
          value={values.oro}
          onChange={(event) =>
            onChange({
              ...values,
              oro: Number(event.target.value),
            })
          }
        />
      </SettingsField>

      <SettingsField label={labels.momentum}>
        <SettingsInput
          type="number"
          min={0}
          max={100}
          value={values.momentum}
          onChange={(event) =>
            onChange({
              ...values,
              momentum: Number(event.target.value),
            })
          }
        />
      </SettingsField>
    </div>
  );
}

export function AhorroSettingsSection({ data }: AhorroSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🌱"
      title="Ahorro"
      summary={data.summary}
      delay={240}
    >
      <DistributionFields
        title={data.copy.targetTitle}
        values={data.target}
        labels={data.labels}
        onChange={updateWealthTarget}
      />

      <SettingsDivider />

      <DistributionFields
        title={data.copy.currentTitle}
        values={data.current}
        labels={data.labels}
        onChange={updateWealthCurrentDistribution}
      />
    </SettingsSection>
  );
}
