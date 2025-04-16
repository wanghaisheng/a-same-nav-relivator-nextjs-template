/**
 * 数据验证错误测试
 */

import { itemsService, categoriesService, testimonialsService, featuresService } from "~/services";

/**
 * 测试数据验证错误处理
 */
export async function testValidationErrors() {
  console.log("开始数据验证错误测试...");

  try {
    // 1. 测试商品数据验证
    console.log("\n[测试商品数据验证错误]");
    
    // 缺少必填字段的商品数据
    const invalidItem = {
      // 缺少name字段
      description: "这是一个无效的商品数据",
      // 缺少price字段
      image: "/images/items/invalid.png",
      category: "electronics"
    };
    
    try {
      // @ts-ignore - 故意传入无效数据进行测试
      const result = await itemsService.create(invalidItem);
      console.error("错误: 应该拒绝无效的商品数据，但创建成功了", result);
    } catch (error) {
      console.log("预期的验证错误:", error.message);
      console.log("商品数据验证测试通过✅");
    }
    
    // 2. 测试分类数据验证
    console.log("\n[测试分类数据验证错误]");
    
    // 缺少必填字段的分类数据
    const invalidCategory = {
      // 缺少name字段
      // 缺少image字段
      productCount: 0
    };
    
    try {
      // @ts-ignore - 故意传入无效数据进行测试
      const result = await categoriesService.create(invalidCategory);
      console.error("错误: 应该拒绝无效的分类数据，但创建成功了", result);
    } catch (error) {
      console.log("预期的验证错误:", error.message);
      console.log("分类数据验证测试通过✅");
    }
    
    // 3. 测试用户评价数据验证
    console.log("\n[测试用户评价数据验证错误]");
    
    // 缺少必填字段的用户评价数据
    const invalidTestimonial = {
      // 缺少content字段
      // 缺少authorName字段
      authorRole: "测试角色",
      // 缺少authorAvatar字段
      rating: 10 // 无效的评分值（超出范围）
    };
    
    try {
      // @ts-ignore - 故意传入无效数据进行测试
      const result = await testimonialsService.create(invalidTestimonial);
      console.error("错误: 应该拒绝无效的用户评价数据，但创建成功了", result);
    } catch (error) {
      console.log("预期的验证错误:", error.message);
      console.log("用户评价数据验证测试通过✅");
    }
    
    // 4. 测试特性数据验证
    console.log("\n[测试特性数据验证错误]");
    
    // 缺少必填字段的特性数据
    const invalidFeature = {
      // 缺少title字段
      description: "这是一个无效的特性描述",
      // 缺少icon字段
    };
    
    try {
      // @ts-ignore - 故意传入无效数据进行测试
      const result = await featuresService.create(invalidFeature);
      console.error("错误: 应该拒绝无效的特性数据，但创建成功了", result);
    } catch (error) {
      console.log("预期的验证错误:", error.message);
      console.log("特性数据验证测试通过✅");
    }
    
    console.log("\n数据验证错误测试完成");
    return true;
  } catch (error) {
    console.error("数据验证错误测试失败:", error);
    return false;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testValidationErrors().catch(console.error);
}