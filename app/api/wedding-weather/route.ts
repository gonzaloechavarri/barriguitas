import { NextResponse } from "next/server";
import { getWeddingWeather } from "@/lib/services/wedding-weather.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getWeddingWeather();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=1800, stale-while-revalidate=3600",
    },
  });
}
