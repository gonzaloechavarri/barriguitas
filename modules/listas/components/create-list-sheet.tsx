"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { pressControlClasses, pressTextControlClasses } from "@/components/motion/press-motion";

const LIST_EMOJI_OPTIONS = ["🛒", "🏡", "💍", "💡", "📦", "🎁", "✈️", "🍽️", "📝", "🌿"] as const;

type CreateListSheetProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, icon: string) => void;
};

export function CreateListSheet({ open, onClose, onCreate }: CreateListSheetProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<string>(LIST_EMOJI_OPTIONS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function reset() {
    setName("");
    setIcon(LIST_EMOJI_OPTIONS[0]);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;

    onCreate(trimmed, icon);
    reset();
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreate();
    }

    if (event.key === "Escape") {
      handleClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={handleClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal
        aria-labelledby="create-list-title"
        className="relative mx-4 mb-[max(1.5rem,env(safe-area-inset-bottom))] w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#111113] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:mb-0"
      >
        <h3
          id="create-list-title"
          className="text-lg font-medium tracking-[-0.02em] text-white/90"
        >
          Nueva lista
        </h3>

        <div className="mt-5">
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre de la lista"
            aria-label="Nombre de la lista"
            className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[0.9375rem] font-light tracking-[-0.01em] text-white/85 outline-none placeholder:text-white/30 focus:border-white/[0.14]"
          />
        </div>

        <div className="mt-4">
          <p className="mb-3 text-xs font-light tracking-[-0.01em] text-white/35">
            Icono
          </p>
          <div className="flex flex-wrap gap-2">
            {LIST_EMOJI_OPTIONS.map((option) => {
              const selected = icon === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setIcon(option)}
                  aria-pressed={selected}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl touch-manipulation ${pressControlClasses} ${
                    selected
                      ? "border border-white/20 bg-white/[0.08]"
                      : "border border-transparent bg-white/[0.03]"
                  }`}
                >
                  <span role="img" aria-hidden>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className={`rounded-full px-4 py-2 text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!name.trim()}
            className={`rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-light tracking-[-0.01em] text-white/80 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
