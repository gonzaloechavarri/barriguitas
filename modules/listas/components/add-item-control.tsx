"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { pressTextControlClasses } from "@/components/motion/press-motion";

type AddItemControlProps = {
  onAdd: (text: string) => void;
};

export function AddItemControl({ onAdd }: AddItemControlProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function openInput() {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }

    if (event.key === "Escape") {
      setExpanded(false);
      setValue("");
    }
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={openInput}
        className={`mt-2 flex w-full items-center gap-2 rounded-2xl px-1 py-3 text-left text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        Añadir
      </button>
    );
  }

  return (
    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (!value.trim()) {
            setExpanded(false);
          }
        }}
        placeholder="Nuevo elemento"
        aria-label="Nuevo elemento"
        className="min-w-0 flex-1 bg-transparent text-[0.9375rem] font-light tracking-[-0.01em] text-white/80 outline-none placeholder:text-white/30"
      />
      <button
        type="button"
        onClick={submit}
        disabled={!value.trim()}
        className={`rounded-full px-3 py-1 text-sm font-light tracking-[-0.01em] text-white/70 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
      >
        Listo
      </button>
    </div>
  );
}
