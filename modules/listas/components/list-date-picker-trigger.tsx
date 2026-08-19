"use client";

import { type Ref, useEffect, useRef, useState } from "react";
import { LIST_DATE_LOCALE } from "@/lib/data/utils/dates";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import styles from "./list-date-picker-trigger.module.css";

type ListDatePickerTriggerProps = {
  value: string;
  onChange: (isoValue: string) => void;
  active?: boolean;
  className?: string;
  inputRef?: Ref<HTMLInputElement>;
};

function assignRef(node: HTMLInputElement | null, ref?: Ref<HTMLInputElement>) {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(node);
    return;
  }

  ref.current = node;
}

const triggerEmojiClass = (active: boolean) =>
  `inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-base leading-none touch-manipulation ${
    active ? "text-white/55" : "text-white/30"
  }`;

type TouchDatePickerTriggerProps = {
  value: string;
  onChange: (isoValue: string) => void;
  active: boolean;
  className: string;
  ariaLabel: string;
};

/**
 * iOS/touch: monta input[type=date] solo mientras el picker está abierto.
 * Tras onChange el input se desmonta — Safari no puede reenfocarlo ni reabrirlo.
 */
function TouchDatePickerTrigger({
  value,
  onChange,
  active,
  className,
  ariaLabel,
}: TouchDatePickerTriggerProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;

    const input = inputRef.current;
    if (!input) return;

    function handleCancel() {
      setPickerOpen(false);
    }

    input.addEventListener("cancel", handleCancel);

    const frame = requestAnimationFrame(() => {
      if (typeof input.showPicker === "function") {
        try {
          input.showPicker();
          return;
        } catch {
          // Safari/iOS: focus tras montar el input en el mismo gesto del usuario.
        }
      }

      input.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      input.removeEventListener("cancel", handleCancel);
    };
  }, [pickerOpen]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.currentTarget.value;
    onChange(next);
    setPickerOpen(false);
  }

  return (
    <span
      className={`${styles.touchTrigger} relative items-center justify-center ${className}`}
    >
      <button
        type="button"
        onClick={() => setPickerOpen(true)}
        aria-label={ariaLabel}
        className={`${triggerEmojiClass(active)} ${pressTextControlClasses}`}
      >
        <span aria-hidden>📅</span>
      </button>

      {pickerOpen ? (
        <input
          ref={inputRef}
          type="date"
          lang={LIST_DATE_LOCALE}
          tabIndex={-1}
          aria-hidden
          defaultValue={value}
          onChange={handleChange}
          className="fixed left-[-9999px] top-auto h-px w-px opacity-0"
        />
      ) : null}
    </span>
  );
}

/**
 * Trigger nativo responsive:
 * - Desktop: input date transparente sobre 📅 (sin cambios).
 * - Touch/iOS: input date efímero — existe solo mientras el picker está abierto.
 */
export function ListDatePickerTrigger({
  value,
  onChange,
  active = false,
  className = "",
  inputRef: externalRef,
}: ListDatePickerTriggerProps) {
  function setDesktopInputRef(node: HTMLInputElement | null) {
    assignRef(node, externalRef);
  }

  function handleDesktopChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.currentTarget.value);
  }

  const ariaLabel = value ? "Cambiar fecha" : "Añadir fecha";

  return (
    <>
      <label
        className={`${styles.desktopTrigger} relative ${triggerEmojiClass(active)} ${className}`}
      >
        <span className="pointer-events-none select-none" aria-hidden>
          📅
        </span>
        <input
          ref={setDesktopInputRef}
          type="date"
          lang={LIST_DATE_LOCALE}
          value={value}
          onChange={handleDesktopChange}
          aria-label={ariaLabel}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <TouchDatePickerTrigger
        value={value}
        onChange={onChange}
        active={active}
        className={className}
        ariaLabel={ariaLabel}
      />
    </>
  );
}
