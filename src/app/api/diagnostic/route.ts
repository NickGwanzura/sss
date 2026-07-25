import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join("/tmp", "diagnostic.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Diagnostic file not found. Container may still be starting up or entrypoint hasn't run yet." },
        { status: 404 }
      );
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to read diagnostic: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
