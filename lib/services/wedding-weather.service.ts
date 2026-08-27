import { getCoupleData } from "@/lib/data/providers/local";
import { daysRemaining } from "@/lib/data/utils";
import {
  fetchMunicipalityDayForecast,
  formatAemetSourceLine,
  getAemetApiKey,
  normalizeIsoDate,
  type ParsedAemetDay,
} from "@/lib/services/aemet.service";
import type {
  WeddingWeatherForecast,
  WeddingWeatherPayload,
  WeddingWeatherPhase,
} from "@/lib/services/wedding-weather.types";

const FORECAST_RELIABLE_DAYS = 7;
const APPROACHING_DAYS = 21;

const DISTANT_MESSAGES = [
  "El tiempo todavía es un misterio.",
  "Aún es pronto para saber cómo será el gran día.",
  "El cielo de Jávea guarda su sorpresa.",
] as const;

const APPROACHING_MESSAGES = [
  "Pronto podremos mirar el cielo de Jávea con más detalle.",
  "Ya casi llega el momento de conocer el pronóstico.",
  "El gran día se acerca — el tiempo aún no está escrito.",
] as const;

function pickRotatingMessage(
  messages: readonly string[],
  referenceDate: Date,
): string {
  const dayIndex = Math.floor(
    Date.UTC(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate(),
    ) / 86_400_000,
  );

  return messages[dayIndex % messages.length];
}

function resolvePhase(daysUntilWedding: number): WeddingWeatherPhase {
  if (daysUntilWedding < 0) return "past";
  if (daysUntilWedding === 0) return "wedding-day";
  if (daysUntilWedding <= FORECAST_RELIABLE_DAYS) return "forecast";
  if (daysUntilWedding <= APPROACHING_DAYS) return "approaching";
  return "distant";
}

function toWeddingForecast(parsed: ParsedAemetDay): WeddingWeatherForecast {
  return {
    condition: parsed.condition,
    conditionEmoji: parsed.conditionEmoji,
    temperatureC: parsed.temperatureC,
    precipitationPercent: parsed.precipitationPercent,
    windKmh: parsed.windKmh,
    windDirection: parsed.windDirection,
  };
}

function formatForecastDetail(forecast: WeddingWeatherForecast): string {
  const parts: string[] = [];

  if (forecast.temperatureC !== null) {
    parts.push(`${forecast.temperatureC} °C`);
  }

  if (forecast.precipitationPercent !== null) {
    parts.push(`${forecast.precipitationPercent}% lluvia`);
  }

  if (
    forecast.windKmh !== null &&
    forecast.windKmh >= 20 &&
    forecast.windDirection
  ) {
    parts.push(`viento ${forecast.windDirection} ${forecast.windKmh} km/h`);
  } else if (forecast.windKmh !== null && forecast.windKmh >= 30) {
    parts.push(`viento ${forecast.windKmh} km/h`);
  }

  if (parts.length === 0) {
    return forecast.condition;
  }

  return parts.join(" · ");
}

function buildPlaceholderPayload(
  phase: WeddingWeatherPhase,
  locationName: string,
  referenceDate: Date,
  secondaryLine: string | null = null,
): WeddingWeatherPayload {
  if (phase === "past") {
    return {
      phase,
      locationName,
      primaryLine: "El gran día ya pasó.",
      secondaryLine: null,
      detailLine: null,
      sourceLine: null,
      isForecast: false,
    };
  }

  if (phase === "distant") {
    return {
      phase,
      locationName,
      primaryLine: pickRotatingMessage(DISTANT_MESSAGES, referenceDate),
      secondaryLine,
      detailLine: null,
      sourceLine: null,
      isForecast: false,
    };
  }

  if (phase === "approaching") {
    return {
      phase,
      locationName,
      primaryLine: pickRotatingMessage(APPROACHING_MESSAGES, referenceDate),
      secondaryLine:
        secondaryLine ??
        "Todavía es pronto para un pronóstico fiable en Jávea.",
      detailLine: null,
      sourceLine: null,
      isForecast: false,
    };
  }

  return {
    phase: "unavailable",
    locationName,
    primaryLine: "No hemos podido consultar el tiempo ahora mismo.",
    secondaryLine: "Lo intentaremos de nuevo más tarde.",
    detailLine: null,
    sourceLine: null,
    isForecast: false,
  };
}

function buildForecastPayload(
  phase: WeddingWeatherPhase,
  locationName: string,
  forecast: WeddingWeatherForecast,
  sourceLine: string | null,
): WeddingWeatherPayload {
  if (phase === "wedding-day") {
    return {
      phase,
      locationName,
      primaryLine: "Hoy es el día",
      secondaryLine: `${forecast.conditionEmoji} ${formatForecastDetail(forecast)}`,
      detailLine: forecast.condition,
      sourceLine,
      isForecast: true,
    };
  }

  return {
    phase: "forecast",
    locationName,
    primaryLine: `${forecast.conditionEmoji} ${forecast.condition}`,
    secondaryLine: formatForecastDetail(forecast),
    detailLine: null,
    sourceLine,
    isForecast: true,
  };
}

export async function getWeddingWeather(
  referenceDate: Date = new Date(),
): Promise<WeddingWeatherPayload> {
  const { wedding } = getCoupleData();
  const locationName = wedding.location.name;
  const daysUntilWedding = daysRemaining(wedding.date, referenceDate);
  const phase = resolvePhase(daysUntilWedding);

  if (phase === "past" || phase === "distant" || phase === "approaching") {
    return buildPlaceholderPayload(phase, locationName, referenceDate);
  }

  const apiKey = getAemetApiKey();
  if (!apiKey) {
    return buildPlaceholderPayload(
      phase === "wedding-day" ? "unavailable" : "approaching",
      locationName,
      referenceDate,
      phase === "wedding-day"
        ? "Configura AEMET_API_KEY para ver el tiempo del gran día."
        : "Todavía es pronto para un pronóstico fiable en Jávea.",
    );
  }

  try {
    const result = await fetchMunicipalityDayForecast(
      wedding.location.municipalityCode,
      normalizeIsoDate(wedding.date),
      apiKey,
    );

    if (!result) {
      return buildPlaceholderPayload(
        phase === "wedding-day" ? "unavailable" : "approaching",
        locationName,
        referenceDate,
        phase === "wedding-day"
          ? "Aún no hay pronóstico fiable para hoy en Jávea."
          : "Todavía es pronto para un pronóstico fiable en Jávea.",
      );
    }

    return buildForecastPayload(
      phase,
      locationName,
      toWeddingForecast(result.parsed),
      formatAemetSourceLine(result.elaborado),
    );
  } catch {
    return buildPlaceholderPayload("unavailable", locationName, referenceDate);
  }
}
