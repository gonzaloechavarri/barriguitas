export function formatRelativeTimeSince(date: Date, now: Date = new Date()): string {
  const elapsedMs = Math.max(0, now.getTime() - date.getTime());
  const days = elapsedMs / 86_400_000;

  if (days < 2 / 1440) return "Hace unos segundos.";
  if (days < 7) return "Hace unos días.";
  if (days < 30) return "Hace una semana.";
  if (days < 90) return "Hace un mes.";

  return "Hace bastante tiempo.";
}
