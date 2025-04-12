import { db } from "./index";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export async function testPostgres() {
  try {
    console.log("Testing PostgreSQL database...");

    // Test users table
    const users = await db.select().from(schema.users);
    console.log("Users:", users);

    // Test products table
    const products = await db.select().from(schema.products);
    console.log("Products:", products);

    // Test categories table
    const categories = await db.select().from(schema.categories);
    console.log("Categories:", categories);

    // Test insert
    const newUser = await db.insert(schema.users).values({
      id: "test-user-1",
      name: "Test User",
      email: "test@example.com",
      image: "/images/avatars/test.png",
    }).returning();
    console.log("Inserted user:", newUser);

    // Test delete
    await db.delete(schema.users).where(eq(schema.users.id, "test-user-1"));
    console.log("Deleted test user");

    console.log("PostgreSQL tests completed successfully");
  } catch (error) {
    console.error("Error testing PostgreSQL:", error);
    throw error;
  }
}

// Run the test
testPostgres().catch(console.error); 