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

export type ModuleHeader = {
  message: string;
};

export type CopilotState = "action" | "calm" | "celebrate";

export type CopilotTaskStatus = "pending" | "completed";

export type CopilotTaskOrigin =
  | "wedding"
  | "home"
  | "finance"
  | "agenda"
  | "system";

export type CopilotTask = {
  id: string;
  title: string;
  status: CopilotTaskStatus;
  /** Menor número = mayor prioridad. */
  priority: number;
  origin: CopilotTaskOrigin;
};

export type CopilotView = {
  state: CopilotState;
  header: string;
  content: string;
  subtext: string;
  taskId?: string;
  originIcon?: string;
};
