type AnimatedCounterProps = {
  value: number | null;
  className?: string;
  placeholder?: string;
};

export function AnimatedCounter({
  value,
  className = "",
  placeholder = "—",
}: AnimatedCounterProps) {
  if (value === null) {
    return <span className={className}>{placeholder}</span>;
  }

  return (
    <span key={value} className={`${className} animate-counter-enter`}>
      {value}
    </span>
  );
}
