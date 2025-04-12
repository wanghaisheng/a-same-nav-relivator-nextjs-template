import { db } from "./index";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export async function testSQLite() {
  try {
    console.log("Testing SQLite database operations...");

    // Test users table
    const users = await db.select().from(schema.users);
    console.log("Users:", users);

    // Test products table
    const products = await db.select().from(schema.products);
    console.log("Products:", products);

    // Test categories table
    const categories = await db.select().from(schema.categories);
    console.log("Categories:", categories);

    // Test insert and delete
    const testUser = {
      id: "test-user-123",
      name: "Test User",
      email: "test@example.com",
      image: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const insertedUser = await db.insert(schema.users).values(testUser).returning();
    console.log("Inserted user:", insertedUser);

    const deletedUser = await db
      .delete(schema.users)
      .where(eq(schema.users.id, testUser.id))
      .returning();
    console.log("Deleted user:", deletedUser);
  } catch (error) {
    console.error("Error testing SQLite:", error);
    throw error;
  }
}

// Run the test
testSQLite().catch(console.error); 