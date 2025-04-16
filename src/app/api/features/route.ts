import { NextResponse } from "next/server";
import { featuresService } from "~/services";

export async function GET(request: Request) {
  try {
    const features = await featuresService.getAll();
    return NextResponse.json(features);
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}