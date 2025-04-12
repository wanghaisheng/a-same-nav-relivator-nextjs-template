import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/db';
import { categories } from '~/db/schema';
import { nanoid } from 'nanoid';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const query = db.select().from(categories);
    if (limit) {
      query.limit(parseInt(limit));
    }

    const result = await query;
    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const now = Date.now();
    
    const newCategory = {
      id: nanoid(),
      name: body.name,
      image: body.image,
      productCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(categories).values(newCategory);
    return NextResponse.json({ category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
} 