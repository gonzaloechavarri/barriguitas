"use client";

import { useEffect, useState } from "react";
import { CurrentTime } from "@/components/current-time";
import { useModuleNavigation } from "@/lib/navigation/module-context";
import { getHeaderMessage } from "@/lib/services/header.service";

export function AppHeader() {
  const headerMessage = useHeaderMessage();

  return (
    <header className="grid grid-cols-2 items-center px-6 py-5 sm:grid-cols-[1fr_auto_1fr] sm:px-10">
      <div className="justify-self-start">
        <span className="text-sm font-medium tracking-[-0.01em] text-white/55">
          Barriguitas
        </span>
      </div>

      <h1
        className={`hidden text-center text-sm font-medium tracking-[-0.01em] text-white/80 motion-safe:transition-opacity motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:block ${
          headerMessage.trim() ? "" : "sm:!hidden"
        }`}
      >
        {headerMessage}
      </h1>

      <div className="col-start-2 justify-self-end sm:col-auto">
        <HeaderActions />
      </div>
    </header>
  );
}

function useHeaderMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => setMessage(getHeaderMessage());

    refresh();
    const interval = window.setInterval(refresh, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return message;
}

function HeaderActions() {
  const { setActiveModule } = useModuleNavigation();

  return (
    <div className="flex items-center gap-4">
      <CurrentTime />
      <button
        type="button"
        onClick={() => setActiveModule("ajustes")}
        aria-label="Abrir ajustes"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.1] hover:bg-white/[0.06] hover:text-white/70"
      >
        <SettingsIcon />
      </button>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
