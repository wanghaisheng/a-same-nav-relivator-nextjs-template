import { items, categories, testimonials, features } from '~/db/postgres/schema';
import { postgresDb as db } from "~/db/postgres";
import { eq } from 'drizzle-orm';

// Type definitions
type Item = typeof items.$inferSelect;
type Category = typeof categories.$inferSelect;
type Testimonial = typeof testimonials.$inferSelect;
type Feature = typeof features.$inferSelect;

// Items service
export const itemsService = {
  getAll: async (): Promise<Item[]> => {
    return db.select().from(items).execute();
  },

  getById: async (id: string): Promise<Item | null> => {
    const result = await db.select().from(items).where(eq(items.id, id)).execute();
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item | null> => {
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
      // 使用timestamp类型，PostgreSQL接受Date对象
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(items).values(newItem).execute();
    return itemsService.getById(newItem.id);
  },

  update: async (id: string, data: Partial<Item>): Promise<Item | null> => {
    await db.update(items)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(items.id, id))
      .execute();
    return itemsService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(items).where(eq(items.id, id)).execute();
  },
};

// Categories service
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    return db.select().from(categories).execute();
  },

  getById: async (id: string): Promise<Category | null> => {
    const result = await db.select().from(categories).where(eq(categories.id, id)).execute();
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category | null> => {
    const newCategory = {
      ...data,
      id: crypto.randomUUID(),
      // 使用timestamp类型，PostgreSQL接受Date对象
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(categories).values(newCategory).execute();
    return categoriesService.getById(newCategory.id);
  },

  update: async (id: string, data: Partial<Category>): Promise<Category | null> => {
    await db.update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .execute();
    return categoriesService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(categories).where(eq(categories.id, id)).execute();
  },
};

// Testimonials service
export const testimonialsService = {
  getAll: async (): Promise<Testimonial[]> => {
    return db.select().from(testimonials).execute();
  },

  getById: async (id: string): Promise<Testimonial | null> => {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).execute();
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial | null> => {
    const newTestimonial = {
      ...data,
      id: crypto.randomUUID(),
      // 使用timestamp类型，PostgreSQL接受Date对象
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(testimonials).values(newTestimonial).execute();
    return testimonialsService.getById(newTestimonial.id);
  },

  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial | null> => {
    await db.update(testimonials)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .execute();
    return testimonialsService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(testimonials).where(eq(testimonials.id, id)).execute();
  },
};

// Features service
export const featuresService = {
  getAll: async (): Promise<Feature[]> => {
    return db.select().from(features).execute();
  },

  getById: async (id: string): Promise<Feature | null> => {
    const result = await db.select().from(features).where(eq(features.id, id)).execute();
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>): Promise<Feature | null> => {
    const newFeature = {
      ...data,
      id: crypto.randomUUID(),
      // 使用timestamp类型，PostgreSQL接受Date对象
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(features).values(newFeature).execute();
    return featuresService.getById(newFeature.id);
  },

  update: async (id: string, data: Partial<Feature>): Promise<Feature | null> => {
    await db.update(features)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(features.id, id))
      .execute();
    return featuresService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(features).where(eq(features.id, id)).execute();
  },
};