import { NextRequest, NextResponse } from 'next/server';
import { database } from '~/db';
import { testimonials } from '~/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/testimonials - Get all testimonials
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const db = database.getDb();
    let query = db.select().from(testimonials);

    if (limit) {
      query = query.limit(limit);
    }

    const data = await query;
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = database.getDb();

    const result = await db.insert(testimonials).values({
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
} 