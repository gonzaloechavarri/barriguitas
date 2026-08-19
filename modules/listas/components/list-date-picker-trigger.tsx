"use client";

import { type Ref, useRef } from "react";
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

/**
 * Trigger nativo responsive:
 * - Desktop (hover + fine pointer): input date transparente sobre 📅 — interacción directa.
 * - Touch/iOS (coarse pointer): botón 📅 + input fuera de pantalla — evita reapertura del picker.
 */
export function ListDatePickerTrigger({
  value,
  onChange,
  active = false,
  className = "",
  inputRef: externalRef,
}: ListDatePickerTriggerProps) {
  const touchInputRef = useRef<HTMLInputElement>(null);

  function setDesktopInputRef(node: HTMLInputElement | null) {
    assignRef(node, externalRef);
  }

  function setTouchInputRef(node: HTMLInputElement | null) {
    touchInputRef.current = node;
  }

  function commitValue(input: HTMLInputElement) {
    onChange(input.value);
  }

  function handleDesktopChange(event: React.ChangeEvent<HTMLInputElement>) {
    commitValue(event.currentTarget);
  }

  function handleTouchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const next = input.value;

    // iOS mantiene el foco en input[type=date] tras "Listo" y reabre el picker.
    input.blur();

    onChange(next);
  }

  function openTouchPicker() {
    const input = touchInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        // Safari/iOS: focus desde gesto directo del usuario.
      }
    }

    input.focus();
  }

  const ariaLabel = value ? "Cambiar fecha" : "Añadir fecha";

  return (
    <>
      {/* Desktop: overlay directo — calendario nativo + entrada manual del navegador. */}
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

      {/* Touch/iOS: botón separado; input fuera del flujo táctil del formulario. */}
      <span
        className={`${styles.touchTrigger} relative items-center justify-center ${className}`}
      >
        <button
          type="button"
          onClick={openTouchPicker}
          aria-label={ariaLabel}
          className={`${triggerEmojiClass(active)} ${pressTextControlClasses}`}
        >
          <span aria-hidden>📅</span>
        </button>
        <input
          ref={setTouchInputRef}
          type="date"
          lang={LIST_DATE_LOCALE}
          tabIndex={-1}
          aria-hidden
          value={value}
          onChange={handleTouchChange}
          className="pointer-events-none fixed left-[-9999px] top-auto h-px w-px opacity-0"
        />
      </span>
    </>
  );
}
