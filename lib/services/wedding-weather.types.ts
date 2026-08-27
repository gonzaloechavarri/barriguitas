export type WeddingWeatherPhase =
  | "distant"
  | "approaching"
  | "forecast"
  | "wedding-day"
  | "past"
  | "unavailable";

export type WeddingWeatherForecast = {
  condition: string;
  conditionEmoji: string;
  temperatureC: number | null;
  precipitationPercent: number | null;
  windKmh: number | null;
  windDirection: string | null;
};

export type WeddingWeatherPayload = {
  phase: WeddingWeatherPhase;
  locationName: string;
  primaryLine: string;
  secondaryLine: string | null;
  detailLine: string | null;
  sourceLine: string | null;
  isForecast: boolean;
};
