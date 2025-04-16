import { NextResponse } from "next/server";
import { itemsService } from "~/services";
import { ItemType } from "~/db/sqlite/schema/items";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const itemType = searchParams.get("itemType"); // 新增itemType参数用于按商品类型过滤
    const category = searchParams.get("category"); // 新增category参数用于按分类过滤
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 8;

    let items;
    switch (type) {
      case "trending":
        items = await itemsService.getTrending(limit);
        break;
      case "popular":
        items = await itemsService.getPopular(limit);
        break;
      case "new":
        items = await itemsService.getNew(limit);
        break;
      case "featured":
        items = await itemsService.getFeatured(limit);
        break;
      case "bestseller":
        items = await itemsService.getBestSellers(limit);
        break;
      case "bestrated":
        items = await itemsService.getBestRated(limit);
        break;
      default:
        items = await itemsService.getAll();
    }
    
    // 按商品类型过滤
    if (itemType && Object.values(ItemType).includes(itemType as any)) {
      items = items.filter(item => item.type === itemType);
    }
    
    // 按分类过滤
    if (category && category !== "All") {
      items = items.filter(item => item.category === category);
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = await itemsService.create(body);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}