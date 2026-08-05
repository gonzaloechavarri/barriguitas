import type { TodaySummary } from "@/lib/services";
import { AttentionList } from "./components/attention-list";
import { HoyHeader } from "./components/hoy-header";

type DocumentosViewProps = {
  summary: TodaySummary;
};

export function DocumentosView({ summary }: DocumentosViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <HoyHeader
        greeting={summary.greeting}
        attentionIntro={summary.attentionIntro}
      />
      <AttentionList initialSummary={summary} />
    </div>
  );
}
