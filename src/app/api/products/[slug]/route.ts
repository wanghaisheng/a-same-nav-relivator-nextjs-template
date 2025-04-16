import { NextResponse } from "next/server";
import { productsService } from "~/services";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const item = await productsService.getBySlug(params.slug);
    
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error(`Error fetching item ${params.slug}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const updatedItem = await productsService.update(params.slug, body);
    
    if (!updatedItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(`Error updating item ${params.slug}:`, error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await productsService.delete(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting item ${params.slug}:`, error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}