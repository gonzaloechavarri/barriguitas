export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

export function daysUntil(targetDate: string, referenceDate: Date): number {
  const diff = parseLocalDate(targetDate).getTime() - referenceDate.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

/** Días hasta un acontecimiento — negativo si ya pasó. */
export function daysRemaining(isoDate: string, referenceDate: Date): number {
  const target = parseLocalDate(isoDate);
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatCoupleEventDate(isoDate: string): string {
  const formatted = parseLocalDate(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formatted.replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
}

export function formatEventDaysRemaining(
  isoDate: string,
  referenceDate: Date,
): string | null {
  const remaining = daysRemaining(isoDate, referenceDate);

  if (remaining < 0) {
    return null;
  }

  if (remaining === 0) {
    return "Es hoy";
  }

  if (remaining === 1) {
    return "Falta 1 día";
  }

  return `Faltan ${remaining} días`;
}

export function formatTripCountdown(startDate: string, referenceDate: Date): string {
  const days = daysUntil(startDate, referenceDate);

  if (days === 0) return "Empieza hoy";
  if (days === 1) return "Empieza mañana";

  return `Empieza en ${days} días`;
}

export function formatWeddingDate(isoDate: string): string {
  const formatted = parseLocalDate(isoDate).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function getWeddingProgress(
  weddingDate: string,
  journeyStartDate: string,
  referenceDate: Date,
): number {
  const total =
    parseLocalDate(weddingDate).getTime() -
    parseLocalDate(journeyStartDate).getTime();
  const elapsed =
    referenceDate.getTime() - parseLocalDate(journeyStartDate).getTime();

  if (total <= 0) return 100;

  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}
