import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// 确保使用正确的 Windows 路径格式
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite, { schema });

async function main() {
  try {
    console.log("Initializing SQLite database...");
    
    // 创建表
    // 这里可以添加创建表的逻辑
    
    console.log("SQLite database initialized successfully!");
  } catch (error) {
    console.error("Error initializing SQLite database:", error);
    process.exit(1);
  }
}

main();