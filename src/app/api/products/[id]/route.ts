import { NextResponse } from "next/server";
import { db } from "~/db";
import * as schema from "~/db/sqlite/schema";
import { eq } from "drizzle-orm";

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, params.id))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
} 