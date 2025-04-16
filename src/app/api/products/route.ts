import { NextResponse } from "next/server";
import { productsService } from "~/services";
// import { ItemType } from "~/db/sqlite/schema/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    // const itemType = searchParams.get("itemType"); // 新增itemType参数用于按商品类型过滤
    const category = searchParams.get("category"); // 新增category参数用于按分类过滤
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 8;

    let products;
    switch (type) {
      case "trending":
        products = await productsService.getTrending(limit);
        break;
      case "popular":
        products = await productsService.getPopular(limit);
        break;
      case "new":
        products = await productsService.getNew(limit);
        break;
      case "featured":
        products = await productsService.getFeatured(limit);
        break;
      case "bestseller":
        products = await productsService.getBestSellers(limit);
        break;
      case "bestrated":
        products = await productsService.getBestRated(limit);
        break;
      default:
        products = await productsService.getAll();
    }
    
    
    // 按分类过滤
    if (category && category !== "All") {
      products = products.filter(item => item.category === category);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = await productsService.create(body);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}