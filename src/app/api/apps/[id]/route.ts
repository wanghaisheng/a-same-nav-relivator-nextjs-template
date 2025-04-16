import { NextResponse } from "next/server";
import { itemsService } from "~/services";
import { ItemType } from "~/db/sqlite/schema/items";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const item = await itemsService.getById(id);
    
    if (!item) {
      return NextResponse.json(
        { error: "App not found" },
        { status: 404 }
      );
    }
    
    // 确保是APP类型
    if (item.type !== ItemType.APP) {
      return NextResponse.json(
        { error: "Item is not an app" },
        { status: 400 }
      );
    }
    
    // 解析JSON字符串字段
    const features = item.features ? JSON.parse(item.features as string) : [];
    const specs = item.specs ? JSON.parse(item.specs as string) : {};
    
    // 计算原价（如果没有提供，则假设为当前价格的1.2倍）
    const originalPrice = item.originalPrice || Number(item.price) * 1.2;
    
    // 模拟版本历史数据（实际项目中应从数据库获取）
    const versionHistory = [
      {
        version: item.version || "1.0.0",
        date: "2023-05-15",
        changes: [
          "首次发布",
          "基本功能实现",
          "用户界面优化"
        ]
      },
      {
        version: "0.9.0",
        date: "2023-04-20",
        changes: [
          "Beta版本发布",
          "修复已知问题",
          "性能优化"
        ]
      }
    ];
    
    // 模拟截图数据（实际项目中应从数据库获取）
    const screenshots = [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png"
    ];
    
    // 返回APP详情数据
    const appData = {
      id: item.id,
      name: item.name,
      price: Number(item.price),
      originalPrice: Number(originalPrice),
      image: item.image || "",
      category: item.category || "",
      type: item.type,
      rating: item.rating ? Number(item.rating) : 4.0,
      inStock: item.quantity > 0,
      description: item.description || "",
      features: features,
      specs: specs,
      platform: item.platform || "",
      version: item.version || "1.0.0",
      minSystemRequirements: item.minSystemRequirements || "",
      // 新增APP特有字段
      releaseDate: "2023-05-15",
      lastUpdate: "2023-06-30",
      developerName: "示例开发者",
      developerWebsite: "https://example.com",
      privacyPolicy: "https://example.com/privacy",
      appSize: 45.6,
      languages: "中文,英文,日文",
      ageRating: "12+",
      downloadCount: 10000,
      versionHistory: versionHistory,
      screenshots: screenshots
    };

    return NextResponse.json(appData);
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json(
      { error: "Failed to fetch app" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // 确保更新的是APP类型
    const item = await itemsService.getById(id);
    if (!item || item.type !== ItemType.APP) {
      return NextResponse.json(
        { error: "App not found or item is not an app" },
        { status: 404 }
      );
    }
    
    const updatedApp = await itemsService.update(id, body);
    return NextResponse.json(updatedApp);
  } catch (error) {
    console.error("Error updating app:", error);
    return NextResponse.json(
      { error: "Failed to update app" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // 确保删除的是APP类型
    const item = await itemsService.getById(id);
    if (!item || item.type !== ItemType.APP) {
      return NextResponse.json(
        { error: "App not found or item is not an app" },
        { status: 404 }
      );
    }
    
    await itemsService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting app:", error);
    return NextResponse.json(
      { error: "Failed to delete app" },
      { status: 500 }
    );
  }
}