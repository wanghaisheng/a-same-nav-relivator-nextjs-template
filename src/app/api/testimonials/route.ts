import { NextResponse } from "next/server";
import { testimonialsService } from "~/services";

export async function GET(request: Request) {
  try {
    const testimonials = await testimonialsService.getAll();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}