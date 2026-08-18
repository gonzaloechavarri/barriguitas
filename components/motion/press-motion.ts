const calmEase = "motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)]";

/** Microcompresión al pulsar botones y controles. */
export const pressControlClasses = `motion-safe:transition-[transform,background-color,border-color,opacity] motion-safe:duration-150 ${calmEase} motion-safe:active:scale-[0.97]`;

/** Botones de texto y acciones discretas. */
export const pressTextControlClasses = `motion-safe:transition-[transform,color,opacity] motion-safe:duration-150 ${calmEase} motion-safe:active:scale-[0.98] motion-safe:active:opacity-75`;

/** Iconos circulares del shell. */
export const pressIconControlClasses = `motion-safe:transition-[transform,background-color,border-color,color] motion-safe:duration-150 ${calmEase} motion-safe:active:scale-[0.94]`;

/** Iconos del dock inferior. */
export const pressDockIconClasses = `motion-safe:transition-[transform,opacity,filter] motion-safe:duration-200 ${calmEase} motion-safe:active:scale-[0.92]`;
