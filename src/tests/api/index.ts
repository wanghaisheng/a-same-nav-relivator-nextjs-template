/**
 * API测试入口文件
 * 用于运行所有API测试
 */

import { testItemsAPI } from "./items.test";
import { testCategoriesAPI } from "./categories.test";
import { testTestimonialsAPI } from "./testimonials.test";
import { testFeaturesAPI } from "./features.test";

/**
 * 运行所有API测试
 */
export async function runAllAPITests() {
  console.log("======= 开始API测试 =======\n");
  
  // 1. 商品API测试
  console.log("\n--- 商品API测试 ---");
  try {
    const itemsResult = await testItemsAPI();
    if (itemsResult) {
      console.log("商品API测试完成✅");
    } else {
      console.error("商品API测试失败❌");
    }
  } catch (error) {
    console.error("商品API测试出错:", error);
  }
  
  // 2. 分类API测试
  console.log("\n--- 分类API测试 ---");
  try {
    const categoriesResult = await testCategoriesAPI();
    if (categoriesResult) {
      console.log("分类API测试完成✅");
    } else {
      console.error("分类API测试失败❌");
    }
  } catch (error) {
    console.error("分类API测试出错:", error);
  }
  
  // 3. 用户评价API测试
  console.log("\n--- 用户评价API测试 ---");
  try {
    const testimonialsResult = await testTestimonialsAPI();
    if (testimonialsResult) {
      console.log("用户评价API测试完成✅");
    } else {
      console.error("用户评价API测试失败❌");
    }
  } catch (error) {
    console.error("用户评价API测试出错:", error);
  }
  
  // 4. 特性API测试
  console.log("\n--- 特性API测试 ---");
  try {
    const featuresResult = await testFeaturesAPI();
    if (featuresResult) {
      console.log("特性API测试完成✅");
    } else {
      console.error("特性API测试失败❌");
    }
  } catch (error) {
    console.error("特性API测试出错:", error);
  }
  
  console.log("\n======= API测试完成 =======");
}

// 如果直接运行此文件，则执行所有测试
if (require.main === module) {
  runAllAPITests().catch(console.error);
}