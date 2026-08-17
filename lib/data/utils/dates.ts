export function daysSince(date: Date, referenceDate: Date = new Date()): number {
  const elapsedMs = Math.max(0, referenceDate.getTime() - date.getTime());
  return Math.floor(elapsedMs / 86_400_000);
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDaysElapsed(days: number): string {
  if (days === 0) return "Hace unos segundos.";
  if (days < 7) return "Hace unos días.";
  if (days < 30) return "Hace una semana.";
  if (days < 90) return "Hace un mes.";

  return "Hace bastante tiempo.";
}

export function resolveCleaningDate(
  lastCleaningAt: string | null,
  defaultDaysAgo: number,
): Date {
  if (lastCleaningAt) {
    return new Date(lastCleaningAt);
  }

  const date = new Date();
  date.setDate(date.getDate() - defaultDaysAgo);
  return date;
}
