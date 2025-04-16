import { NextResponse } from "next/server";
import { itemsService } from "~/services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await itemsService.getById(params.id);
    
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error(`Error fetching item ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedItem = await itemsService.update(params.id, body);
    
    if (!updatedItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(`Error updating item ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await itemsService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting item ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}