import { NextResponse } from "next/server";
import { getWealthView } from "@/lib/services/wealth.service";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  try {
    const view = await getWealthView();
    return NextResponse.json(view);
  } catch {
    return NextResponse.json(
      { error: "No se pudo obtener el ahorro." },
      { status: 500 },
    );
  }
}
