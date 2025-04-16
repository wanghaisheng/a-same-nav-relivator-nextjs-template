import { NextResponse } from "next/server";
import { itemsService } from "~/services";
import { ItemType } from "~/db/sqlite/schema/items";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const platform = searchParams.get("platform");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 8;
    const sortBy = searchParams.get("sortBy") || "rating";

    // 获取所有APP类型的商品
    let apps = await itemsService.getByType(ItemType.APP);
    
    // 按分类过滤
    if (category && category !== "All") {
      apps = apps.filter(app => app.category === category);
    }
    
    // 按平台过滤
    if (platform) {
      apps = apps.filter(app => {
        if (!app.platform) return false;
        return app.platform.split(",").some(p => p.trim().toLowerCase() === platform.toLowerCase());
      });
    }
    
    // 排序
    if (sortBy === "rating") {
      apps = apps.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "price_low") {
      apps = apps.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price_high") {
      apps = apps.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "newest") {
      apps = apps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // 限制返回数量
    if (limit > 0) {
      apps = apps.slice(0, limit);
    }

    return NextResponse.json(apps);
  } catch (error) {
    console.error("Error fetching apps:", error);
    return NextResponse.json(
      { error: "Failed to fetch apps" },
      { status: 500 }
    );
  }
}

// 获取单个APP详情
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 确保创建的是APP类型
    const newAppData = {
      ...body,
      type: ItemType.APP
    };
    
    const newApp = await itemsService.create(newAppData);
    return NextResponse.json(newApp);
  } catch (error) {
    console.error("Error creating app:", error);
    return NextResponse.json(
      { error: "Failed to create app" },
      { status: 500 }
    );
  }
}