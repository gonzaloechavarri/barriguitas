export type AttentionItem = {
  icon: string;
  title: string;
  subtitle: string;
};

export type TodaySummary = {
  greeting: string;
  attentionIntro: string;
  items: AttentionItem[];
};

export type WeddingData = {
  date: string;
  journeyStartDate: string;
  cardTitle: string;
  countdownLabel: string;
  progressMessage: string;
  milestones: string[];
  nextPlan: {
    cardTitle: string;
    label: string;
    destination: string;
    subtitle: string;
  };
};

export type ModuleViewData = {
  icon: string;
  title: string;
  description: string;
};

export type WealthSummary = ModuleViewData;

export type AgendaData = ModuleViewData;
