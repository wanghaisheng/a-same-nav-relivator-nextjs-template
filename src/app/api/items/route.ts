import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/db';
import { items } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// GET /api/items - Get all items with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const category = searchParams.get('category');

    let query = db.select().from(items);

    if (category) {
      query = query.where(eq(items.category, category));
    }

    if (limit) {
      query = query.limit(limit);
    }

    const data = await query.execute();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST /api/items - Create a new item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date();
    
    const newItem = {
      ...body,
      id: crypto.randomUUID(),
      quantity: body.quantity ?? 0,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(items).values(newItem).execute();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
} 