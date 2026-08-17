export function formatShortDate(date: Date): string {
  const formatted = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted.replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
}

export function daysSince(date: Date, referenceDate: Date = new Date()): number {
  const elapsedMs = Math.max(0, referenceDate.getTime() - date.getTime());
  return Math.floor(elapsedMs / 86_400_000);
}

export function formatDaysElapsed(days: number): string {
  if (days === 0) return "(hoy)";
  if (days === 1) return "(1 día)";

  return `(${days} días)`;
}

export function resolveCleaningDate(
  lastCleaningAt: string | null,
  defaultDaysAgo: number,
  referenceDate: Date = new Date(),
): Date {
  if (lastCleaningAt) {
    return new Date(lastCleaningAt);
  }

  const date = new Date(referenceDate);
  date.setDate(date.getDate() - defaultDaysAgo);
  return date;
}
