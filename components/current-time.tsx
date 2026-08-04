"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CurrentTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <time
      dateTime={time ?? undefined}
      className="text-sm font-normal tabular-nums tracking-[-0.01em] text-white/35 opacity-0 animate-fade-in"
    >
      {time ?? "\u00a0"}
    </time>
  );
}
