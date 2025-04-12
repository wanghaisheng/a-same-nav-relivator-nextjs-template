import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/db';
import { products } from '~/db/schema';
import { eq } from "drizzle-orm";
import { nanoid } from 'nanoid';

// GET /api/products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = db.select().from(products);

    if (category) {
      query = query.where(eq(products.category, category));
    }

    const products = await query;
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
} 