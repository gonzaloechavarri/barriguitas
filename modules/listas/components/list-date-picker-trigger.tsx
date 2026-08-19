"use client";

import { LIST_DATE_LOCALE } from "@/lib/data/utils/dates";

type ListDatePickerTriggerProps = {
  value: string;
  onChange: (isoValue: string) => void;
  active?: boolean;
  className?: string;
};

/**
 * Trigger nativo de fecha compatible con iOS Safari.
 * El toque del usuario cae directamente sobre input[type=date] —
 * sin showPicker() ni click() programático.
 */
export function ListDatePickerTrigger({
  value,
  onChange,
  active = false,
  className = "",
}: ListDatePickerTriggerProps) {
  return (
    <label
      className={`relative inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-base leading-none touch-manipulation ${
        active ? "text-white/55" : "text-white/30"
      } ${className}`}
    >
      <span className="pointer-events-none select-none" aria-hidden>
        📅
      </span>
      <input
        type="date"
        lang={LIST_DATE_LOCALE}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={value ? "Cambiar fecha" : "Añadir fecha"}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}
