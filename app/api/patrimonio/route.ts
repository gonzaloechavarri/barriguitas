import { getPortfolioPerformance } from "@/lib/services/portfolio/portfolio.service";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  try {
    const performance = await getPortfolioPerformance();
    return NextResponse.json(performance);
  } catch {
    return NextResponse.json(
      { error: "No se pudo obtener el ahorro." },
      { status: 500 },
    );
  }
}
