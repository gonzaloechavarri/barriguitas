import { FeatureCard } from "./feature-card";

const features = [
  { icon: "🏠", title: "Casa", delay: 160 },
  { icon: "❤️", title: "Nosotros", delay: 220 },
  { icon: "💰", title: "Patrimonio", delay: 280 },
  { icon: "🎯", title: "Objetivos", delay: 340 },
  { icon: "🤖", title: "IA", delay: 400 },
] as const;

export function FeaturesGrid() {
  return (
    <section
      aria-label="Módulos de Barriguitas"
      className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
    >
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}
