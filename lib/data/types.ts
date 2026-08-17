export type AttentionItem = {
  icon: string;
  title: string;
  subtitle: string;
};

export type AttentionLevel = "calm" | "one" | "several";

/** Señal futura emitida por cada módulo para calcular el estado del día. */
export type ModuleAttentionSignal = {
  moduleId: string;
  priority: "normal" | "important";
};

export type TodayAttentionState = {
  level: AttentionLevel;
  signals: ModuleAttentionSignal[];
};

export type SmartGreeting = {
  message: string;
  period: "morning" | "afternoon" | "evening";
};

export type TodaySummary = {
  greeting: string;
  names: string;
  attentionIntro: string;
  attentionState: TodayAttentionState;
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
    destination: string;
    startDate: string;
  };
};

export type ModuleViewData = {
  icon: string;
  title: string;
  description: string;
};

export type PerformanceMetric = {
  label: string;
  change: string;
};

export type StrategyAllocationLine = {
  icon: string;
  label: string;
  percentage: string;
};

export type WealthView = {
  cardTitle: string;
  subtitle: string;
  performance: PerformanceMetric[];
  strategy: {
    cardTitle: string;
    allocations: StrategyAllocationLine[];
    target: StrategyAllocationLine[];
    statusMessage: string;
    deviation: string;
    isInTransition: boolean;
  };
};

/** @deprecated Usar WealthView. */
export type WealthSummary = ModuleViewData;

export type AgendaData = ModuleViewData;

export type ModuleHeader = {
  message: string;
};

export type CopilotRecommendation = {
  icon: string;
  title: string;
  subtitle: string;
  /** Menor número = mayor prioridad. 0 indica estado tranquilo. */
  priority: number;
};

export type CopilotState = "action" | "calm" | "celebrate";
