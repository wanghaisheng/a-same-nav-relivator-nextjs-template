/**
 * 商品API测试
 */

import { itemsService } from "~/services";

/**
 * 测试商品API
 */
export async function testItemsAPI() {
  console.log("开始商品API测试...");

  try {
    // 1. 测试获取所有商品
    console.log("\n[测试获取所有商品]");
    const allItems = await itemsService.getAll();
    console.log(`获取到 ${allItems.length} 个商品`);
    
    if (allItems.length > 0) {
      console.log("获取所有商品测试通过✅");
    } else {
      console.warn("获取所有商品返回空数组，可能需要检查数据库是否有数据");
    }
    
    // 2. 测试创建商品
    console.log("\n[测试创建商品]");
    const newItem = {
      name: "API测试商品",
      description: "这是一个API测试商品",
      price: 199.99,
      quantity: 20,
      image: "/images/items/test-api.png",
      category: "electronics",
      isTrending: 1,
      isPopular: 1,
      isNew: 1,
      isFeatured: 0,
      isBestSeller: 0,
      rating: 4.2,
      salesCount: 0,
      viewCount: 0
    };
    
    const createdItem = await itemsService.create(newItem);
    console.log("创建的商品:", createdItem);
    
    if (createdItem && createdItem.id) {
      console.log("创建商品测试通过✅");
      
      // 3. 测试获取单个商品
      console.log("\n[测试获取单个商品]");
      const item = await itemsService.getById(createdItem.id);
      console.log("获取的单个商品:", item);
      
      if (item && item.id === createdItem.id) {
        console.log("获取单个商品测试通过✅");
      } else {
        console.error("获取单个商品测试失败❌");
      }
      
      // 4. 测试更新商品
      console.log("\n[测试更新商品]");
      const updateData = {
        name: "更新后的API测试商品",
        description: "这是更新后的API测试商品描述",
        price: 149.99
      };
      
      const updatedItem = await itemsService.update(createdItem.id, updateData);
      console.log("更新后的商品:", updatedItem);
      
      if (updatedItem && updatedItem.name === updateData.name) {
        console.log("更新商品测试通过✅");
      } else {
        console.error("更新商品测试失败❌");
      }
      
      // 5. 测试删除商品
      console.log("\n[测试删除商品]");
      await itemsService.delete(createdItem.id);
      
      // 验证删除是否成功
      const deletedItem = await itemsService.getById(createdItem.id);
      
      if (!deletedItem) {
        console.log("删除商品测试通过✅");
      } else {
        console.error("删除商品测试失败❌");
      }
    } else {
      console.error("创建商品测试失败❌");
    }
    
    console.log("\n商品API测试完成");
    return true;
  } catch (error) {
    console.error("商品API测试失败:", error);
    return false;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testItemsAPI().catch(console.error);
}