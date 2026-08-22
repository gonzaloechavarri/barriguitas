import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

const PRINCIPLES = [
  {
    icon: "🌍",
    title: "Diversificación",
    text: "ACWI como núcleo. No necesitamos adivinar qué país, sector o empresa ganará.",
  },
  {
    icon: "🪙",
    title: "Protección",
    text: "oro como diversificador y cobertura ante determinados escenarios monetarios e inflacionarios.",
  },
  {
    icon: "🚀",
    title: "Satélite",
    text: "un pequeño porcentaje para convicciones concretas, como Nasdaq, sin poner en riesgo el plan.",
  },
  {
    icon: "💸",
    title: "Costes mínimos",
    text: "cada décima de coste es rentabilidad que dejamos de componer.",
  },
  {
    icon: "🧾",
    title: "Fiscalidad eficiente",
    text: "priorizamos vehículos fiscalmente eficientes cuando eviten costes fiscales innecesarios.",
  },
  {
    icon: "🔄",
    title: "Rebalanceo",
    text: "preferentemente mediante nuevas aportaciones, evitando vender por sistema.",
  },
  {
    icon: "🕰️",
    title: "Horizonte",
    text: "pensamos en décadas, no en meses. Los drawdowns forman parte del camino.",
  },
  {
    icon: "🧠",
    title: "No seguimos modas",
    text: "ningún tuit, ETF o activo nuevo cambia el plan por sí solo.",
  },
  {
    icon: "🏦",
    title: "Diversificación operativa",
    text: "MyInvestor como custodio principal y un segundo custodio cuando tenga sentido.",
  },
  {
    icon: "🏠",
    title: "Deuda como herramienta",
    text: "si la hipoteca es barata, no amortizamos por reflejo; comparamos coste de deuda y coste de oportunidad.",
  },
  {
    icon: "😴",
    title: "Regla definitiva",
    text: "si el plan sigue funcionando, no lo tocamos por aburrimiento, FOMO o ruido.",
  },
] as const;

/** Card informativa — principios de la cartera, sin datos editables. */
export function FinancialPrinciplesCard() {
  return (
    <GlassCard className="p-6 sm:p-7" delay={240}>
      <CardTitle icon="🧘">Principios de tranquilidad financiera</CardTitle>

      <ul className="mt-8 flex flex-col">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle.title}
            className={
              index === 0
                ? "pb-5"
                : "border-t border-white/[0.05] py-5 last:pb-0"
            }
          >
            <p className="flex gap-2.5 text-[0.9375rem] font-light leading-snug tracking-[-0.01em] text-white/65">
              <span className="shrink-0" role="img" aria-hidden>
                {principle.icon}
              </span>
              <span>
                <span className="font-medium text-white/75">
                  {principle.title}:
                </span>{" "}
                {principle.text}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
