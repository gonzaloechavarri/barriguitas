export function formatShortDate(date: Date): string {  const formatted = date.toLocaleDateString("es-ES", {
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

/** Parsea YYYY-MM-DD sin desfase de zona horaria. */
export function parseIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`);
}

export function toIsoDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Locale fijo para entradas de fecha en Listas — independiente del dispositivo. */
export const LIST_DATE_LOCALE = "es-ES";

const listDateInputFormatter = new Intl.DateTimeFormat(LIST_DATE_LOCALE, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Convierte YYYY-MM-DD al formato de entrada DD/MM/YYYY. */
export function formatIsoDateForListInput(isoDate: string): string {
  return listDateInputFormatter.format(parseIsoDate(isoDate));
}

/**
 * Interpreta una fecha escrita manualmente en formato español DD/MM/YYYY.
 * Devuelve YYYY-MM-DD o null si la fecha no es válida.
 */
export function parseSpanishListDateInput(input: string): string | null {
  const normalized = input.trim().replace(/-/g, "/");
  const match = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return toIsoDateString(date);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Etiqueta discreta para fechas en elementos de lista. */
export function formatListItemDueDate(
  isoDate: string,
  referenceDate: Date = new Date(),
): string {
  const date = parseIsoDate(isoDate);
  const today = startOfDay(referenceDate);
  const target = startOfDay(date);
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / 86_400_000,
  );

  if (diffDays === 0) return "hoy";
  if (diffDays === 1) return "mañana";
  if (diffDays > 1 && diffDays <= 6) {
    return date
      .toLocaleDateString("es-ES", { weekday: "long" })
      .replace(/\bde\b/g, "")
      .trim();
  }

  const formatted = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  return formatted.replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
}

export function isDueDateOverdue(
  isoDate: string,
  referenceDate: Date = new Date(),
): boolean {
  const date = parseIsoDate(isoDate);
  return startOfDay(date).getTime() < startOfDay(referenceDate).getTime();
}

export function isDueDateToday(
  isoDate: string,
  referenceDate: Date = new Date(),
): boolean {
  const date = parseIsoDate(isoDate);
  return startOfDay(date).getTime() === startOfDay(referenceDate).getTime();
}

/** Encabezado de la vista Hoy — fecha local civil. */
export function formatHoyDateLabel(referenceDate: Date = new Date()): string {
  const formatted = referenceDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const cleaned = formatted.replace(/\bde\b/g, "").replace(/\s+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/** Etiqueta relativa para tareas vencidas en Hoy. */
export function formatHoyOverdueLabel(
  isoDate: string,
  referenceDate: Date = new Date(),
): string {
  const diffDays = Math.round(
    (startOfDay(parseIsoDate(isoDate)).getTime() -
      startOfDay(referenceDate).getTime()) /
      86_400_000,
  );

  if (diffDays === -1) return "ayer";

  return formatListItemDueDate(isoDate, referenceDate);
}
