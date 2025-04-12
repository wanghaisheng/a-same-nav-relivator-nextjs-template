import { NextRequest, NextResponse } from 'next/server';
import { database } from '~/db';
import { features } from '~/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/features - Get all features
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const db = database.getDb();
    let query = db.select().from(features);

    if (limit) {
      query = query.limit(limit);
    }

    const data = await query;
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}

// POST /api/features - Create a new feature
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = database.getDb();

    const result = await db.insert(features).values({
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating feature:', error);
    return NextResponse.json(
      { error: 'Failed to create feature' },
      { status: 500 }
    );
  }
} 