import { NextResponse } from "next/server";
import { categoriesService } from "~/services";

export async function GET(request: Request) {
  try {
    const categories = await categoriesService.getAll();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}