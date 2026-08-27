export type HoyWeatherLocation = {
  icon: string;
  label: string;
  temperature: string | null;
};

export type HoyWeatherPayload = {
  locations: HoyWeatherLocation[];
  sourceLine: string | null;
};
