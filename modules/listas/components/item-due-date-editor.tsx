"use client";

import { useEffect, useRef, useState } from "react";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import { formatListItemDueDate } from "@/lib/data/utils/dates";
import {
  DATE_INPUT_CLASS,
  ListDueDateInput,
} from "./list-due-date-input";

type ItemDueDateEditorProps = {
  dueDate: string | null;
  onSave: (dueDate: string | null) => void;
  onClose: () => void;
};

export function ItemDueDateEditor({
  dueDate,
  onSave,
  onClose,
}: ItemDueDateEditorProps) {
  const [value, setValue] = useState(dueDate ?? "");
  const pickerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(dueDate ?? "");
  }, [dueDate]);

  function handleSave() {
    const resolved = pickerInputRef.current?.value || value;
    onSave(resolved || null);
    onClose();
  }

  function handleRemove() {
    onSave(null);
    onClose();
  }

  return (
    <div className="ml-8 flex flex-wrap items-center gap-2 pb-1 pt-1">
      <ListDueDateInput
        value={value}
        onChange={setValue}
        pickerInputRef={pickerInputRef}
        className={DATE_INPUT_CLASS}
        autoFocus
      />

      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={handleSave}
        disabled={!value}
        className={`rounded-full px-3 py-1.5 text-xs font-light tracking-[-0.01em] text-white/70 disabled:opacity-30 touch-manipulation ${pressTextControlClasses}`}
      >
        Guardar
      </button>

      {dueDate ? (
        <button
          type="button"
          onClick={handleRemove}
          className={`rounded-full px-3 py-1.5 text-xs font-light tracking-[-0.01em] text-white/40 touch-manipulation ${pressTextControlClasses}`}
        >
          Quitar fecha
        </button>
      ) : null}

      <button
        type="button"
        onClick={onClose}
        className={`rounded-full px-3 py-1.5 text-xs font-light tracking-[-0.01em] text-white/30 touch-manipulation ${pressTextControlClasses}`}
      >
        Cancelar
      </button>
    </div>
  );
}

type ItemDueDateLabelProps = {
  dueDate: string;
  onEdit: () => void;
};

export function ItemDueDateLabel({ dueDate, onEdit }: ItemDueDateLabelProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onEdit();
      }}
      className={`shrink-0 text-sm font-light tabular-nums tracking-[-0.01em] text-white/35 touch-manipulation ${pressTextControlClasses}`}
    >
      {formatListItemDueDate(dueDate)}
    </button>
  );
}
