/** Clases compartidas para microinteracciones serenas en tarjetas. */
export const cardMotionClasses =
  "opacity-0 animate-card-enter motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-safe:md:hover:-translate-y-px motion-safe:md:hover:border-white/[0.08] motion-safe:md:hover:bg-white/[0.035]";

/** Tarjetas interactivas (cabeceras pulsables, etc.). */
export const interactiveCardPressClasses =
  "motion-safe:transition-[transform,background-color] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-safe:active:scale-[0.99] motion-safe:active:bg-white/[0.04]";
