"use client";

import { pressControlClasses, pressTextControlClasses } from "@/components/motion/press-motion";

type DeleteListConfirmProps = {
  open: boolean;
  listName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteListConfirm({
  open,
  listName,
  onCancel,
  onConfirm,
}: DeleteListConfirmProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Cancelar"
        onClick={onCancel}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <div
        role="alertdialog"
        aria-modal
        aria-labelledby="delete-list-title"
        aria-describedby="delete-list-description"
        className="relative mx-4 mb-[max(1.5rem,env(safe-area-inset-bottom))] w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#111113] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:mb-0"
      >
        <h3
          id="delete-list-title"
          className="text-lg font-medium tracking-[-0.02em] text-white/90"
        >
          ¿Eliminar {listName}?
        </h3>
        <p
          id="delete-list-description"
          className="mt-2 text-sm font-light tracking-[-0.01em] text-white/40"
        >
          Se eliminarán también todos sus elementos.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={`rounded-full px-4 py-2 text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-light tracking-[-0.01em] text-red-300/90 touch-manipulation ${pressControlClasses}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
