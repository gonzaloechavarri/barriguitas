"use client";

import { useEffect, useRef, useState } from "react";
import {
  formatIsoDateForListInput,
  LIST_DATE_LOCALE,
  parseSpanishListDateInput,
} from "@/lib/data/utils/dates";

const DATE_INPUT_CLASS =
  "rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-light tracking-[-0.01em] text-white/80 outline-none focus:border-white/[0.14]";

type ListDueDateInputProps = {
  value: string;
  onChange: (isoValue: string) => void;
  className?: string;
  autoFocus?: boolean;
};

export function ListDueDateInput({
  value,
  onChange,
  className = DATE_INPUT_CLASS,
  autoFocus = false,
}: ListDueDateInputProps) {
  const [display, setDisplay] = useState("");
  const pickerRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplay(value ? formatIsoDateForListInput(value) : "");
  }, [value]);

  useEffect(() => {
    if (!autoFocus) return;
    requestAnimationFrame(() => textRef.current?.focus());
  }, [autoFocus]);

  function openPicker() {
    const input = pickerRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  }

  function commitDisplay(raw: string) {
    const trimmed = raw.trim();

    if (!trimmed) {
      onChange("");
      setDisplay("");
      return;
    }

    const parsed = parseSpanishListDateInput(trimmed);

    if (parsed) {
      onChange(parsed);
      setDisplay(formatIsoDateForListInput(parsed));
      return;
    }

    setDisplay(value ? formatIsoDateForListInput(value) : "");
  }

  function handlePickerChange(iso: string) {
    onChange(iso);
    setDisplay(iso ? formatIsoDateForListInput(iso) : "");
  }

  return (
    <div lang={LIST_DATE_LOCALE} className="relative">
      <input
        ref={textRef}
        type="text"
        inputMode="numeric"
        lang={LIST_DATE_LOCALE}
        placeholder="DD/MM/AAAA"
        value={display}
        onChange={(event) => setDisplay(event.target.value)}
        onBlur={() => commitDisplay(display)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commitDisplay(display);
          }
        }}
        aria-label="Fecha"
        className={`${className} w-full pr-9`}
      />

      <input
        ref={pickerRef}
        type="date"
        lang={LIST_DATE_LOCALE}
        value={value}
        onChange={(event) => handlePickerChange(event.target.value)}
        tabIndex={-1}
        aria-hidden
        className="absolute right-0 top-0 h-full w-9 cursor-pointer opacity-0"
      />

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={openPicker}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-sm leading-none text-white/30"
      >
        📅
      </button>
    </div>
  );
}

export { DATE_INPUT_CLASS };
