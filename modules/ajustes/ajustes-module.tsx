"use client";

import { AjustesView } from "./ajustes-view";

export function AjustesModule() {
  return (
    <div className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100">
      <AjustesView />
    </div>
  );
}
