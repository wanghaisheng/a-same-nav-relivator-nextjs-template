import { NextResponse } from 'next/server';
import { database } from '~/db';
import { testimonials } from '~/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/testimonials/[id] - Get a single testimonial by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, params.id));

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// PUT /api/testimonials/[id] - Update a testimonial
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = database.getDb();

    const result = await db
      .update(testimonials)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials/[id] - Delete a testimonial
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .delete(testimonials)
      .where(eq(testimonials.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
} 