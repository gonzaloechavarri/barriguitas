type HoyEmptyStateProps = {
  show: boolean;
};

export function HoyEmptyState({ show }: HoyEmptyStateProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-start gap-2 px-1 sm:mt-12">
      <p className="text-base font-light tracking-[-0.01em] text-white/55">
        ✨ Todo al día
      </p>
      <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/35">
        No hay nada pendiente para hoy.
      </p>
    </div>
  );
}
