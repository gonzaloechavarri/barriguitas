import { getCoupleData } from "@/lib/data/providers/local";
import { daysRemaining } from "@/lib/data/utils";
import type {
  WeddingWeatherForecast,
  WeddingWeatherPayload,
  WeddingWeatherPhase,
} from "@/lib/services/wedding-weather.types";

const AEMET_BASE = "https://opendata.aemet.es/opendata/api";
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

type AemetDay = {
  fecha?: string;
  temperatura?: { minima?: number; maxima?: number };
  probPrecipitacion?: Array<{ value?: string | number; periodo?: string }>;
  estadoCielo?: Array<{
    value?: string;
    periodo?: string;
    descripcion?: string;
  }>;
  viento?: Array<{
    direccion?: string;
    velocidad?: number;
  }>;
};

type AemetMunicipioForecast = {
  nombre?: string;
  elaborado?: string;
  prediccion?: { dia?: AemetDay[] };
};

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

function normalizeIsoDate(value: string): string {
  return value.slice(0, 10);
}

function skyEmojiFromDescription(description: string): string {
  const text = description.toLowerCase();

  if (text.includes("tormenta")) return "⛈️";
  if (text.includes("lluvia") || text.includes("llovizna")) return "🌧️";
  if (text.includes("nieve")) return "❄️";
  if (text.includes("nuboso") || text.includes("cubierto")) return "☁️";
  if (text.includes("intervalos") || text.includes("poco nuboso")) return "⛅";
  if (text.includes("despejado") || text.includes("soleado")) return "☀️";
  return "🌤️";
}

function parseAemetDay(day: AemetDay): WeddingWeatherForecast | null {
  const skyEntry =
    day.estadoCielo?.find((entry) => entry.periodo === "00-24") ??
    day.estadoCielo?.[0];
  const rainEntry =
    day.probPrecipitacion?.find((entry) => entry.periodo === "00-24") ??
    day.probPrecipitacion?.[0];
  const windEntry = day.viento?.[0];

  const condition = skyEntry?.descripcion?.trim();
  if (!condition) {
    return null;
  }

  const maxTemp = day.temperatura?.maxima;
  const minTemp = day.temperatura?.minima;
  const temperatureC =
    typeof maxTemp === "number"
      ? maxTemp
      : typeof minTemp === "number"
        ? minTemp
        : null;

  const precipitationRaw = rainEntry?.value;
  const precipitationPercent =
    precipitationRaw === undefined || precipitationRaw === ""
      ? null
      : Number(precipitationRaw);

  return {
    condition,
    conditionEmoji: skyEmojiFromDescription(condition),
    temperatureC: Number.isFinite(temperatureC) ? temperatureC : null,
    precipitationPercent: Number.isFinite(precipitationPercent)
      ? precipitationPercent
      : null,
    windKmh:
      typeof windEntry?.velocidad === "number" ? windEntry.velocidad : null,
    windDirection: windEntry?.direccion?.trim() ?? null,
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

function formatSourceLine(elaborado: string | null): string | null {
  if (!elaborado) {
    return "Fuente: AEMET";
  }

  const parsed = new Date(elaborado);
  if (Number.isNaN(parsed.getTime())) {
    return "Fuente: AEMET";
  }

  const formatted = parsed.toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `AEMET · ${formatted.replace(/\bde\b/g, "").trim()}`;
}

async function fetchAemetJson<T>(url: string, apiKey: string): Promise<T> {
  const response = await fetch(url, {
    headers: { api_key: apiKey },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`AEMET respondió con ${response.status}`);
  }

  const envelope = (await response.json()) as {
    estado?: number;
    descripcion?: string;
    datos?: string;
  };

  if (envelope.estado !== 200 || !envelope.datos) {
    throw new Error(envelope.descripcion ?? "Respuesta AEMET incompleta");
  }

  const dataResponse = await fetch(envelope.datos, {
    next: { revalidate: 3600 },
  });

  if (!dataResponse.ok) {
    throw new Error(`AEMET datos respondió con ${dataResponse.status}`);
  }

  return (await dataResponse.json()) as T;
}

async function fetchWeddingDayForecast(
  municipalityCode: string,
  weddingDate: string,
  apiKey: string,
): Promise<{ forecast: WeddingWeatherForecast; sourceLine: string | null } | null> {
  const payload = await fetchAemetJson<AemetMunicipioForecast[] | AemetMunicipioForecast>(
    `${AEMET_BASE}/prediccion/especifica/municipio/diaria/${municipalityCode}`,
    apiKey,
  );

  const root = Array.isArray(payload) ? payload[0] : payload;
  const targetDay = root?.prediccion?.dia?.find(
    (day) => day.fecha && normalizeIsoDate(day.fecha) === weddingDate,
  );

  if (!targetDay) {
    return null;
  }

  const forecast = parseAemetDay(targetDay);
  if (!forecast) {
    return null;
  }

  return {
    forecast,
    sourceLine: formatSourceLine(root.elaborado ?? null),
  };
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

  const apiKey = process.env.AEMET_API_KEY?.trim();
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
    const result = await fetchWeddingDayForecast(
      wedding.location.municipalityCode,
      wedding.date,
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
      result.forecast,
      result.sourceLine,
    );
  } catch {
    return buildPlaceholderPayload("unavailable", locationName, referenceDate);
  }
}
