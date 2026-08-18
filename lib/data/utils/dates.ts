<<<<<<< Updated upstream
=======
<<<<<<< HEAD
export function formatShortDate(date: Date): string {
  const formatted = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted.replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
}

=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
export function daysSince(date: Date, referenceDate: Date = new Date()): number {
  const elapsedMs = Math.max(0, referenceDate.getTime() - date.getTime());
  return Math.floor(elapsedMs / 86_400_000);
}

<<<<<<< Updated upstream
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

=======
<<<<<<< HEAD
export function formatDaysElapsed(days: number): string {
  if (days === 0) return "(hoy)";
  if (days === 1) return "(1 día)";

  return `(${days} días)`;
=======
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

>>>>>>> Stashed changes
export function formatDaysElapsed(days: number): string {
  if (days === 0) return "Hace unos segundos.";
  if (days < 7) return "Hace unos días.";
  if (days < 30) return "Hace una semana.";
  if (days < 90) return "Hace un mes.";

  return "Hace bastante tiempo.";
<<<<<<< Updated upstream
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
}

export function resolveCleaningDate(
  lastCleaningAt: string | null,
  defaultDaysAgo: number,
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  referenceDate: Date = new Date(),
=======
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
): Date {
  if (lastCleaningAt) {
    return new Date(lastCleaningAt);
  }

<<<<<<< Updated upstream
  const date = new Date();
=======
<<<<<<< HEAD
  const date = new Date(referenceDate);
=======
  const date = new Date();
>>>>>>> cursor/text-polish-ajustes-e9c9
>>>>>>> Stashed changes
  date.setDate(date.getDate() - defaultDaysAgo);
  return date;
}
