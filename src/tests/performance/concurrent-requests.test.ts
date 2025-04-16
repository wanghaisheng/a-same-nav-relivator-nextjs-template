/**
 * 并发请求测试
 */

import { itemsService, categoriesService } from "~/services";

/**
 * 测试并发请求性能
 */
export async function testConcurrentRequests() {
  console.log("开始并发请求测试...");

  try {
    // 1. 测试并发读取请求
    console.log("\n[并发读取请求测试]");
    
    // 创建多个并发请求
    const concurrentReadCount = 50; // 并发数量
    console.log(`测试 ${concurrentReadCount} 个并发读取请求...`);
    
    const readStart = Date.now();
    
    // 创建并发读取请求数组
    const readPromises = Array(concurrentReadCount).fill(0).map((_, index) => {
      // 交替请求商品和分类，模拟真实场景
      return index % 2 === 0 
        ? itemsService.getAll()
        : categoriesService.getAll();
    });
    
    // 等待所有请求完成
    const readResults = await Promise.all(readPromises);
    
    const readEnd = Date.now();
    const readDuration = readEnd - readStart;
    
    console.log(`并发读取请求完成，总耗时: ${readDuration}ms`);
    console.log(`平均每个请求耗时: ${readDuration / concurrentReadCount}ms`);
    
    // 2. 测试并发写入请求
    console.log("\n[并发写入请求测试]");
    
    // 创建测试数据
    const testItems = Array(10).fill(0).map((_, index) => ({
      name: `测试商品-${Date.now()}-${index}`,
      description: `并发测试商品描述 ${index}`,
      price: 99.99 + index,
      quantity: 10,
      image: "/images/items/test.png",
      category: "electronics"
    }));
    
    // 创建并发写入请求
    const concurrentWriteCount = 10; // 写入并发数量
    console.log(`测试 ${concurrentWriteCount} 个并发写入请求...`);
    
    const writeStart = Date.now();
    
    // 创建并发写入请求数组
    const writePromises = testItems.map((item) => {
      return itemsService.create(item);
    });
    
    // 等待所有写入请求完成
    const writeResults = await Promise.all(writePromises);
    
    const writeEnd = Date.now();
    const writeDuration = writeEnd - writeStart;
    
    console.log(`并发写入请求完成，总耗时: ${writeDuration}ms`);
    console.log(`平均每个写入请求耗时: ${writeDuration / concurrentWriteCount}ms`);
    
    // 清理测试数据
    console.log("清理测试数据...");
    const cleanupPromises = writeResults
      .filter(item => item && item.id) // 过滤掉可能的null结果
      .map(item => itemsService.delete(item.id));
    
    await Promise.all(cleanupPromises);
    console.log("测试数据清理完成");
    
    console.log("并发请求测试完成✅");
    return {
      readDuration,
      readAverage: readDuration / concurrentReadCount,
      writeDuration,
      writeAverage: writeDuration / concurrentWriteCount
    };
  } catch (error) {
    console.error("并发请求测试失败:", error);
    return null;
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testConcurrentRequests().catch(console.error);
}