"use client";

import type { SettingsAhorroView } from "@/lib/services/settings.service";
import type { StrategyDistribution } from "@/lib/data/types/editable";
import { updateWealthTarget } from "@/lib/services/settings.service";
import {
  SettingsDivider,
  SettingsField,
  SettingsInput,
} from "./settings-field";
import { SettingsSection } from "./settings-section";

type AhorroSettingsSectionProps = {
  data: SettingsAhorroView;
};

type TargetFieldsProps = {
  values: StrategyDistribution;
  labels: SettingsAhorroView["labels"];
  onChange: (values: StrategyDistribution) => void;
};

function TargetFields({ values, labels, onChange }: TargetFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-light tracking-[-0.01em] text-white/35">
        Objetivo estratégico
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

function CurrentDistributionSummary({
  current,
  lastUpdatedLabel,
  labels,
}: {
  current: StrategyDistribution;
  lastUpdatedLabel: string;
  labels: SettingsAhorroView["labels"];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-light tracking-[-0.01em] text-white/35">
        Distribución en la última actualización
      </p>
      <p className="text-sm font-light tracking-[-0.01em] text-white/45">
        Calculada automáticamente a partir de la fotografía del {lastUpdatedLabel}.
      </p>
      <div className="mt-2 flex flex-col gap-1.5 text-sm font-light tabular-nums tracking-[-0.01em] text-white/40">
        <p>
          {labels.acwi}: {current.acwi} %
        </p>
        <p>
          {labels.oro}: {current.oro} %
        </p>
        <p>
          {labels.momentum}: {current.momentum} %
        </p>
      </div>
    </div>
  );
}

export function AhorroSettingsSection({ data }: AhorroSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🌱"
      title="Ahorro"
      summary={`Objetivo ${data.target.acwi}/${data.target.oro}/${data.target.momentum}`}
      delay={240}
    >
      <TargetFields
        values={data.target}
        labels={data.labels}
        onChange={updateWealthTarget}
      />

      <SettingsDivider />

      <CurrentDistributionSummary
        current={data.current}
        lastUpdatedLabel={data.lastUpdatedLabel}
        labels={data.labels}
      />
    </SettingsSection>
  );
}
