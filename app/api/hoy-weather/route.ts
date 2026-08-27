import { NextResponse } from "next/server";
import { getHoyWeather } from "@/lib/services/hoy-weather.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getHoyWeather();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=900, stale-while-revalidate=1800",
    },
  });
}
