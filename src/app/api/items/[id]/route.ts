import { NextResponse } from 'next/server';
import { database } from '~/db';
import { items } from '~/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/items/[id] - Get a single item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .select()
      .from(items)
      .where(eq(items.id, params.id));

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

// PUT /api/items/[id] - Update an item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = database.getDb();

    const result = await db
      .update(items)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(items.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

// DELETE /api/items/[id] - Delete an item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = database.getDb();
    const result = await db
      .delete(items)
      .where(eq(items.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
} 