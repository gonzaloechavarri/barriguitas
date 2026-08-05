type ModuleShellProps = {
  icon: string;
  title: string;
  description: string;
};

export function ModuleShell({ icon, title, description }: ModuleShellProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
      <span className="text-5xl sm:text-6xl" role="img" aria-hidden>
        {icon}
      </span>

      <h2 className="mt-8 text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-xl text-sm font-light leading-snug tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]">
        {description}
      </p>
    </div>
  );
}
