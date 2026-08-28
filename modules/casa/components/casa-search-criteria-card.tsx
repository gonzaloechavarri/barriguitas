"use client";

import { useState } from "react";
import type {
  HomeCriteriaGroup,
  HomeSearchCriteria,
  HomeSearchCriterion,
} from "@/data/house";
import { CasaBlockCard } from "./casa-block-card";

type CasaSearchCriteriaCardProps = {
  criteria: HomeSearchCriteria;
  onUpdate: (group: HomeCriteriaGroup, id: string, label: string) => void;
  onAdd: (group: HomeCriteriaGroup, label: string) => void;
};

const GROUPS: { id: HomeCriteriaGroup; title: string }[] = [
  { id: "essentials", title: "Imprescindibles" },
  { id: "preferences", title: "Preferencias" },
];

const criterionInputClassName =
  "w-full border-0 bg-transparent p-0 text-[0.9375rem] font-light leading-snug tracking-[-0.01em] text-white/65 outline-none placeholder:text-white/22";

export function CasaSearchCriteriaCard({
  criteria,
  onUpdate,
  onAdd,
}: CasaSearchCriteriaCardProps) {
  return (
    <CasaBlockCard icon="🔎" title="Lo que buscamos" delay={160}>
      <div className="flex flex-col gap-6">
        {GROUPS.map((group) => (
          <CriteriaGroup
            key={group.id}
            groupId={group.id}
            title={group.title}
            items={criteria[group.id]}
            onUpdate={(id, label) => onUpdate(group.id, id, label)}
            onAdd={(label) => onAdd(group.id, label)}
          />
        ))}
      </div>
    </CasaBlockCard>
  );
}

function CriteriaGroup({
  groupId,
  title,
  items,
  onUpdate,
  onAdd,
}: {
  groupId: HomeCriteriaGroup;
  title: string;
  items: readonly HomeSearchCriterion[];
  onUpdate: (id: string, label: string) => void;
  onAdd: (label: string) => void;
}) {
  const headingId = `casa-criteria-${groupId}`;

  return (
    <section aria-labelledby={headingId}>
      <h3
        id={headingId}
        className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/32"
      >
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <CriterionInput
              key={`${item.id}:${item.label}`}
              label={item.label}
              ariaLabel={`${title}: ${item.label}`}
              onCommit={(next) => onUpdate(item.id, next)}
            />
          </li>
        ))}
        <li>
          <AddCriterionInput
            ariaLabel={`Añadir a ${title}`}
            onCommit={onAdd}
          />
        </li>
      </ul>
    </section>
  );
}

function CriterionInput({
  label,
  ariaLabel,
  onCommit,
}: {
  label: string;
  ariaLabel: string;
  onCommit: (label: string) => void;
}) {
  const [draft, setDraft] = useState(label);

  function commit() {
    const trimmed = draft.trim();

    if (trimmed === label) {
      setDraft(label);
      return;
    }

    onCommit(trimmed);
    if (!trimmed) return;
    if (trimmed !== draft) setDraft(trimmed);
  }

  return (
    <input
      aria-label={ariaLabel}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      className={criterionInputClassName}
    />
  );
}

function AddCriterionInput({
  ariaLabel,
  onCommit,
}: {
  ariaLabel: string;
  onCommit: (label: string) => void;
}) {
  const [draft, setDraft] = useState("");

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft("");
      return;
    }

    onCommit(trimmed);
    setDraft("");
  }

  return (
    <input
      aria-label={ariaLabel}
      value={draft}
      placeholder="Añadir"
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      className={criterionInputClassName}
    />
  );
}
