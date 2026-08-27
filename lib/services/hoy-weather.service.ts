import { getCoupleData } from "@/lib/data/providers/local";
import {
  fetchMunicipalityDayForecast,
  formatAemetSourceLine,
  formatTemperatureBadge,
  getAemetApiKey,
  getTodayIsoDate,
} from "@/lib/services/aemet.service";
import type {
  HoyWeatherLocation,
  HoyWeatherPayload,
} from "@/lib/services/hoy-weather.types";

/** Valencia ciudad — código INE AEMET 46250. */
const VALENCIA_MUNICIPALITY_CODE = "46250";

type HoyWeatherTarget = {
  label: string;
  municipalityCode: string;
};

function getHoyWeatherTargets(): HoyWeatherTarget[] {
  const { wedding } = getCoupleData();

  return [
    {
      label: "Valencia",
      municipalityCode: VALENCIA_MUNICIPALITY_CODE,
    },
    {
      label: "Jávea",
      municipalityCode: wedding.location.municipalityCode,
    },
  ];
}

export async function getHoyWeather(
  referenceDate: Date = new Date(),
): Promise<HoyWeatherPayload> {
  const apiKey = getAemetApiKey();
  if (!apiKey) {
    return { locations: [], sourceLine: null };
  }

  const todayIso = getTodayIsoDate(referenceDate);
  const targets = getHoyWeatherTargets();
  let sourceLine: string | null = null;

  const locations = (
    await Promise.all(
      targets.map(async (target): Promise<HoyWeatherLocation | null> => {
        try {
          const result = await fetchMunicipalityDayForecast(
            target.municipalityCode,
            todayIso,
            apiKey,
          );

          if (!result) {
            return null;
          }

          if (!sourceLine && result.elaborado) {
            sourceLine = formatAemetSourceLine(result.elaborado);
          }

          return {
            icon: result.parsed.conditionEmoji,
            label: target.label,
            temperature: formatTemperatureBadge(result.parsed.temperatureC),
          };
        } catch {
          return null;
        }
      }),
    )
  ).filter((location): location is HoyWeatherLocation => location !== null);

  return {
    locations,
    sourceLine: locations.length > 0 ? sourceLine : null,
  };
}
