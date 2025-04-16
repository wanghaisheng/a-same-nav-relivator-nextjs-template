/**
 * 分类API测试
 */

import { categoriesService } from "~/services";

/**
 * 测试分类API
 */
export async function testCategoriesAPI() {
  console.log("开始分类API测试...");

  try {
    // 1. 测试获取所有分类
    console.log("\n[测试获取所有分类]");
    const allCategories = await categoriesService.getAll();
    console.log(`获取到 ${allCategories.length} 个分类`);
    
    if (allCategories.length > 0) {
      console.log("获取所有分类测试通过✅");
    } else {
      console.warn("获取所有分类返回空数组，可能需要检查数据库是否有数据");
    }
    
    // 2. 测试创建分类
    console.log("\n[测试创建分类]");
    const newCategory = {
      name: "API测试分类",
      image: "/images/categories/test-api.png",
      productCount: 0
    };
    
    const createdCategory = await categoriesService.create(newCategory);
    console.log("创建的分类:", createdCategory);
    
    if (createdCategory && createdCategory.id) {
      console.log("创建分类测试通过✅");
      
      // 3. 测试获取单个分类
      console.log("\n[测试获取单个分类]");
      const category = await categoriesService.getById(createdCategory.id);
      console.log("获取的单个分类:", category);
      
      if (category && category.id === createdCategory.id) {
        console.log("获取单个分类测试通过✅");
      } else {
        console.error("获取单个分类测试失败❌");
      }
      
      // 4. 测试更新分类
      console.log("\n[测试更新分类]");
      const updateData = {
        name: "更新后的API测试分类",
        productCount: 5
      };
      
      const updatedCategory = await categoriesService.update(createdCategory.id, updateData);
      console.log("更新后的分类:", updatedCategory);
      
      if (updatedCategory && updatedCategory.name === updateData.name) {
        console.log("更新分类测试通过✅");
      } else {
        console.error("更新分类测试失败❌");
      }
      
      // 5. 测试删除分类
      console.log("\n[测试删除分类]");
      await categoriesService.delete(createdCategory.id);
      
      // 验证删除是否成功
      const deletedCategory = await categoriesService.getById(createdCategory.id);
      
      if (!deletedCategory) {
        console.log("删除分类测试通过✅");
      } else {
        console.error("删除分类测试失败❌");
      }
    } else {
      console.error("创建分类测试失败❌");
    }
    
    console.log("\n分类API测试完成");
    return true;
  } catch (error) {
    console.error("分类API测试失败:", error);
    return false;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testCategoriesAPI().catch(console.error);
}