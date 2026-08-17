"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type CasaMenuAction = "mark_done" | "edit" | "hide" | "delete";

type CasaItemMenuProps = {
  labels: {
    markDone: string;
    edit: string;
    hide: string;
    delete: string;
  };
  onAction: (action: CasaMenuAction) => void;
};

const MENU_ITEMS: CasaMenuAction[] = [
  "mark_done",
  "edit",
  "hide",
  "delete",
];

type MenuPosition = {
  top: number;
  right: number;
};

export function CasaItemMenu({ labels, onAction }: CasaItemMenuProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (document.getElementById("casa-context-menu")?.contains(target)) return;

      setOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function updatePosition() {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 6,
      right: window.innerWidth - rect.right,
    });
  }

  function handleToggle() {
    if (!open) {
      updatePosition();
    }

    setOpen((value) => !value);
  }

  function handleSelect(action: CasaMenuAction) {
    onAction(action);
    setOpen(false);
  }

  const labelByAction: Record<CasaMenuAction, string> = {
    mark_done: labels.markDone,
    edit: labels.edit,
    hide: labels.hide,
    delete: labels.delete,
  };

  const menu = visible ? (
    <div
      id="casa-context-menu"
      role="menu"
      style={{ top: position.top, right: position.right }}
      className={`fixed z-50 min-w-[10.5rem] origin-top-right rounded-xl border border-white/[0.08] bg-[#141416]/96 py-1 shadow-[0_10px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        open
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-[0.96] opacity-0"
      }`}
    >
      {MENU_ITEMS.map((action) => (
        <button
          key={action}
          type="button"
          role="menuitem"
          onClick={() => handleSelect(action)}
          className="flex w-full px-3.5 py-2 text-left text-[0.8125rem] font-light tracking-[-0.01em] text-white/50 transition-colors duration-150 hover:bg-white/[0.05] hover:text-white/70"
        >
          {labelByAction[action]}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Opciones"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={handleToggle}
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-light tracking-[0.08em] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "bg-white/[0.06] text-white/55"
            : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
        }`}
      >
        ⋯
      </button>

      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </>
  );
}
