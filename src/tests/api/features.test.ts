/**
 * 特性API测试
 */

import { featuresService } from "~/services";

/**
 * 测试特性API
 */
export async function testFeaturesAPI() {
  console.log("开始特性API测试...");

  try {
    // 1. 测试获取所有特性
    console.log("\n[测试获取所有特性]");
    const allFeatures = await featuresService.getAll();
    console.log(`获取到 ${allFeatures.length} 个特性`);
    
    if (allFeatures.length > 0) {
      console.log("获取所有特性测试通过✅");
    } else {
      console.warn("获取所有特性返回空数组，可能需要检查数据库是否有数据");
    }
    
    // 2. 测试创建特性
    console.log("\n[测试创建特性]");
    const newFeature = {
      title: "API测试特性",
      description: "这是一个API测试特性描述",
      icon: "test-icon"
    };
    
    const createdFeature = await featuresService.create(newFeature);
    console.log("创建的特性:", createdFeature);
    
    if (createdFeature && createdFeature.id) {
      console.log("创建特性测试通过✅");
      
      // 3. 测试获取单个特性
      console.log("\n[测试获取单个特性]");
      const feature = await featuresService.getById(createdFeature.id);
      console.log("获取的单个特性:", feature);
      
      if (feature && feature.id === createdFeature.id) {
        console.log("获取单个特性测试通过✅");
      } else {
        console.error("获取单个特性测试失败❌");
      }
      
      // 4. 测试更新特性
      console.log("\n[测试更新特性]");
      const updateData = {
        title: "更新后的API测试特性",
        description: "这是更新后的API测试特性描述"
      };
      
      const updatedFeature = await featuresService.update(createdFeature.id, updateData);
      console.log("更新后的特性:", updatedFeature);
      
      if (updatedFeature && updatedFeature.title === updateData.title) {
        console.log("更新特性测试通过✅");
      } else {
        console.error("更新特性测试失败❌");
      }
      
      // 5. 测试删除特性
      console.log("\n[测试删除特性]");
      await featuresService.delete(createdFeature.id);
      
      // 验证删除是否成功
      const deletedFeature = await featuresService.getById(createdFeature.id);
      
      if (!deletedFeature) {
        console.log("删除特性测试通过✅");
      } else {
        console.error("删除特性测试失败❌");
      }
    } else {
      console.error("创建特性测试失败❌");
    }
    
    console.log("\n特性API测试完成");
    return true;
  } catch (error) {
    console.error("特性API测试失败:", error);
    return false;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testFeaturesAPI().catch(console.error);
}