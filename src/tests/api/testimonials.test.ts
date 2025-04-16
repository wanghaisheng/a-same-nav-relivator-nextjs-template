/**
 * 用户评价API测试
 */

import { testimonialsService } from "~/services";

/**
 * 测试用户评价API
 */
export async function testTestimonialsAPI() {
  console.log("开始用户评价API测试...");

  try {
    // 1. 测试获取所有用户评价
    console.log("\n[测试获取所有用户评价]");
    const allTestimonials = await testimonialsService.getAll();
    console.log(`获取到 ${allTestimonials.length} 个用户评价`);
    
    if (allTestimonials.length > 0) {
      console.log("获取所有用户评价测试通过✅");
    } else {
      console.warn("获取所有用户评价返回空数组，可能需要检查数据库是否有数据");
    }
    
    // 2. 测试创建用户评价
    console.log("\n[测试创建用户评价]");
    const newTestimonial = {
      content: "这是一个API测试用户评价内容，产品非常好用！",
      authorName: "测试用户",
      authorRole: "测试工程师",
      authorAvatar: "/images/avatars/test-user.png",
      rating: 5
    };
    
    const createdTestimonial = await testimonialsService.create(newTestimonial);
    console.log("创建的用户评价:", createdTestimonial);
    
    if (createdTestimonial && createdTestimonial.id) {
      console.log("创建用户评价测试通过✅");
      
      // 3. 测试获取单个用户评价
      console.log("\n[测试获取单个用户评价]");
      const testimonial = await testimonialsService.getById(createdTestimonial.id);
      console.log("获取的单个用户评价:", testimonial);
      
      if (testimonial && testimonial.id === createdTestimonial.id) {
        console.log("获取单个用户评价测试通过✅");
      } else {
        console.error("获取单个用户评价测试失败❌");
      }
      
      // 4. 测试更新用户评价
      console.log("\n[测试更新用户评价]");
      const updateData = {
        content: "这是更新后的API测试用户评价内容，产品依然很好用！",
        rating: 4
      };
      
      const updatedTestimonial = await testimonialsService.update(createdTestimonial.id, updateData);
      console.log("更新后的用户评价:", updatedTestimonial);
      
      if (updatedTestimonial && updatedTestimonial.content === updateData.content) {
        console.log("更新用户评价测试通过✅");
      } else {
        console.error("更新用户评价测试失败❌");
      }
      
      // 5. 测试删除用户评价
      console.log("\n[测试删除用户评价]");
      await testimonialsService.delete(createdTestimonial.id);
      
      // 验证删除是否成功
      const deletedTestimonial = await testimonialsService.getById(createdTestimonial.id);
      
      if (!deletedTestimonial) {
        console.log("删除用户评价测试通过✅");
      } else {
        console.error("删除用户评价测试失败❌");
      }
    } else {
      console.error("创建用户评价测试失败❌");
    }
    
    console.log("\n用户评价API测试完成");
    return true;
  } catch (error) {
    console.error("用户评价API测试失败:", error);
    return false;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testTestimonialsAPI().catch(console.error);
}