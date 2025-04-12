import { NextResponse } from 'next/server';
import { database } from '~/db';
import { features } from '~/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/features/[id] - Get a single feature by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .select()
      .from(features)
      .where(eq(features.id, params.id));

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching feature:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feature' },
      { status: 500 }
    );
  }
}

// PUT /api/features/[id] - Update a feature
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = database.getDb();

    const result = await db
      .update(features)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(features.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating feature:', error);
    return NextResponse.json(
      { error: 'Failed to update feature' },
      { status: 500 }
    );
  }
}

// DELETE /api/features/[id] - Delete a feature
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .delete(features)
      .where(eq(features.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting feature:', error);
    return NextResponse.json(
      { error: 'Failed to delete feature' },
      { status: 500 }
    );
  }
} 