export function HoyEmptyState() {
  return (
    <div className="mt-10 flex flex-col items-start gap-2 px-1 sm:mt-12">
      <p className="text-base font-light tracking-[-0.01em] text-white/55">
        Todo al día
      </p>
      <p className="max-w-sm text-sm font-light leading-relaxed tracking-[-0.01em] text-white/32">
        No hay tareas vencidas, nada para hoy ni fechas próximas.
      </p>
    </div>
  );
}
