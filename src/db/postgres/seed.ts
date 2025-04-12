import { db } from "./index";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";

export async function seed() {
  try {
    // Seed users
    await db.execute(sql`
      INSERT INTO users (id, name, email, image)
      VALUES (${nanoid()}, ${"Admin User"}, ${"admin@example.com"}, ${"/images/avatars/admin.png"})
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed categories
    const categories = [
      { name: "Electronics", image: "/images/categories/electronics.jpg" },
      { name: "Clothing", image: "/images/categories/clothing.jpg" },
      { name: "Books", image: "/images/categories/books.jpg" },
    ];

    for (const category of categories) {
      await db.execute(sql`
        INSERT INTO categories (id, name, image)
        VALUES (${nanoid()}, ${category.name}, ${category.image})
        ON CONFLICT (id) DO NOTHING
      `);
    }

    // Seed products
    const products = [
      {
        name: "Smartphone X",
        price: 999.99,
        originalPrice: 1099.99,
        image: "/images/products/smartphone.jpg",
        category: "Electronics",
        rating: 4.5,
        inStock: true,
        description: "Latest smartphone with advanced features",
        features: ["5G", "128GB Storage", "12MP Camera"],
        specs: { "Screen": "6.1\"", "Battery": "4000mAh" },
      },
      {
        name: "Laptop Pro",
        price: 1499.99,
        originalPrice: 1699.99,
        image: "/images/products/laptop.jpg",
        category: "Electronics",
        rating: 4.8,
        inStock: true,
        description: "Professional laptop for work and play",
        features: ["16GB RAM", "512GB SSD", "Backlit Keyboard"],
        specs: { "Screen": "15.6\"", "Processor": "Intel i7" },
      },
    ];

    for (const product of products) {
      await db.execute(sql`
        INSERT INTO products (
          id, name, price, originalPrice, image, category, rating,
          inStock, description, features, specs
        )
        VALUES (
          ${nanoid()},
          ${product.name},
          ${product.price},
          ${product.originalPrice},
          ${product.image},
          ${product.category},
          ${product.rating},
          ${product.inStock},
          ${product.description},
          ${product.features},
          ${product.specs}
        )
        ON CONFLICT (id) DO NOTHING
      `);
    }

    console.log("PostgreSQL database seeded successfully");
  } catch (error) {
    console.error("Error seeding PostgreSQL database:", error);
    throw error;
  }
} 