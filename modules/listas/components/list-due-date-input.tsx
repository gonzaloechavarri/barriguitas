"use client";

import {
  formatIsoDateForListInput,
  LIST_DATE_LOCALE,
} from "@/lib/data/utils/dates";

export const DATE_INPUT_CLASS =
  "max-w-[11.5rem] rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm font-light tabular-nums tracking-[-0.01em] text-white/80 outline-none [color-scheme:dark] focus:border-white/[0.14] touch-manipulation";

type ListDueDateInputProps = {
  value: string;
  onChange: (isoValue: string) => void;
  className?: string;
};

/**
 * Control de fecha directo: input[type=date] nativo, sin overlays ni triggers.
 * value/onChange usan YYYY-MM-DD como fecha civil.
 */
export function ListDueDateInput({
  value,
  onChange,
  className = "",
}: ListDueDateInputProps) {
  return (
    <div lang={LIST_DATE_LOCALE} className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-light tracking-[-0.01em] text-white/30">
        {value ? formatIsoDateForListInput(value) : "Añadir fecha"}
      </span>
      <input
        type="date"
        lang={LIST_DATE_LOCALE}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={value ? "Fecha de la tarea" : "Añadir fecha"}
        className={DATE_INPUT_CLASS}
      />
    </div>
  );
}
