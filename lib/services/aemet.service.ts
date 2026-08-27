import { toIsoDateString } from "@/lib/data/utils/dates";

export const AEMET_BASE = "https://opendata.aemet.es/opendata/api";

export type AemetDay = {
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

export type AemetMunicipioForecast = {
  nombre?: string;
  elaborado?: string;
  prediccion?: { dia?: AemetDay[] };
};

export type ParsedAemetDay = {
  condition: string;
  conditionEmoji: string;
  temperatureC: number | null;
  temperatureMinC: number | null;
  precipitationPercent: number | null;
  windKmh: number | null;
  windDirection: string | null;
};

type CachedForecast = {
  expiresAt: number;
  forecast: AemetMunicipioForecast;
};

const forecastCache = new Map<string, CachedForecast>();
const CACHE_TTL_MS = 30 * 60 * 1000;

export function getAemetApiKey(): string | null {
  const apiKey = process.env.AEMET_API_KEY?.trim();
  return apiKey || null;
}

export function normalizeIsoDate(value: string): string {
  return value.slice(0, 10);
}

export function skyEmojiFromDescription(description: string): string {
  const text = description.toLowerCase();

  if (text.includes("tormenta")) return "⛈️";
  if (text.includes("lluvia") || text.includes("llovizna")) return "🌧️";
  if (text.includes("nieve")) return "❄️";
  if (text.includes("nuboso") || text.includes("cubierto")) return "☁️";
  if (text.includes("intervalos") || text.includes("poco nuboso")) return "⛅";
  if (text.includes("despejado") || text.includes("soleado")) return "☀️";
  return "🌤️";
}

export function parseAemetDay(day: AemetDay): ParsedAemetDay | null {
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
    temperatureMinC: typeof minTemp === "number" ? minTemp : null,
    precipitationPercent: Number.isFinite(precipitationPercent)
      ? precipitationPercent
      : null,
    windKmh:
      typeof windEntry?.velocidad === "number" ? windEntry.velocidad : null,
    windDirection: windEntry?.direccion?.trim() ?? null,
  };
}

export function formatAemetSourceLine(elaborado: string | null): string {
  if (!elaborado) {
    return "AEMET";
  }

  const parsed = new Date(elaborado);
  if (Number.isNaN(parsed.getTime())) {
    return "AEMET";
  }

  const formatted = parsed.toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `AEMET · ${formatted.replace(/\bde\b/g, "").trim()}`;
}

export function formatTemperatureBadge(celsius: number | null): string | null {
  if (celsius === null || !Number.isFinite(celsius)) {
    return null;
  }

  return `${Math.round(celsius)}°`;
}

async function fetchAemetJson<T>(url: string, apiKey: string): Promise<T> {
  const response = await fetch(url, {
    headers: { api_key: apiKey },
    next: { revalidate: 1800 },
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
    next: { revalidate: 1800 },
  });

  if (!dataResponse.ok) {
    throw new Error(`AEMET datos respondió con ${dataResponse.status}`);
  }

  return (await dataResponse.json()) as T;
}

export async function fetchMunicipalityDailyForecast(
  municipalityCode: string,
  apiKey: string,
): Promise<AemetMunicipioForecast | null> {
  const cached = forecastCache.get(municipalityCode);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.forecast;
  }

  const payload = await fetchAemetJson<
    AemetMunicipioForecast[] | AemetMunicipioForecast
  >(
    `${AEMET_BASE}/prediccion/especifica/municipio/diaria/${municipalityCode}`,
    apiKey,
  );

  const root = Array.isArray(payload) ? payload[0] : payload;
  if (!root) {
    return null;
  }

  forecastCache.set(municipalityCode, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    forecast: root,
  });

  return root;
}

export function findAemetDay(
  forecast: AemetMunicipioForecast,
  isoDate: string,
): AemetDay | null {
  return (
    forecast.prediccion?.dia?.find(
      (day) => day.fecha && normalizeIsoDate(day.fecha) === isoDate,
    ) ?? null
  );
}

export async function fetchMunicipalityDayForecast(
  municipalityCode: string,
  isoDate: string,
  apiKey: string,
): Promise<{ parsed: ParsedAemetDay; elaborado: string | null } | null> {
  const forecast = await fetchMunicipalityDailyForecast(municipalityCode, apiKey);
  if (!forecast) {
    return null;
  }

  const day = findAemetDay(forecast, isoDate);
  if (!day) {
    return null;
  }

  const parsed = parseAemetDay(day);
  if (!parsed) {
    return null;
  }

  return {
    parsed,
    elaborado: forecast.elaborado ?? null,
  };
}

export function getTodayIsoDate(referenceDate: Date = new Date()): string {
  return toIsoDateString(referenceDate);
}
