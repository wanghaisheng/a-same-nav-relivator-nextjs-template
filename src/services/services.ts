import { items, categories } from '~/db/schema';
import { testimonials } from '~/db/sqlite/schema/testimonials';
import { features } from '~/db/sqlite/schema/features';
import { db } from '~/db/sqlite';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

// Type definitions
type Item = typeof items.$inferSelect;
type Category = typeof categories.$inferSelect;
type Testimonial = typeof testimonials.$inferSelect;
type Feature = typeof features.$inferSelect;

// Items service
export const itemsService = {
  getAll: async (): Promise<Item[]> => {
    return db.select().from(items).all();
  },

  getById: async (id: string): Promise<Item | null> => {
    const result = db.select().from(items).where(eq(items.id, id)).all();
    return result[0] || null;
  },

  create: async (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.insert(items).values(newItem).run();
    return itemsService.getById(newItem.id)!;
  },

  update: async (id: string, data: Partial<Item>): Promise<Item | null> => {
    db.update(items)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(items.id, id))
      .run();
    return itemsService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    db.delete(items).where(eq(items.id, id)).run();
  },
};

// Categories service
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    return db.select().from(categories).all();
  },

  getById: async (id: string): Promise<Category | null> => {
    const result = db.select().from(categories).where(eq(categories.id, id)).all();
    return result[0] || null;
  },

  create: async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    const newCategory = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.insert(categories).values(newCategory).run();
    return categoriesService.getById(newCategory.id)!;
  },

  update: async (id: string, data: Partial<Category>): Promise<Category | null> => {
    db.update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .run();
    return categoriesService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    db.delete(categories).where(eq(categories.id, id)).run();
  },
};

// Testimonials service
export const testimonialsService = {
  getAll: async (): Promise<Testimonial[]> => {
    return db.select().from(testimonials).all();
  },

  getById: async (id: string): Promise<Testimonial | null> => {
    const result = db.select().from(testimonials).where(eq(testimonials.id, id)).all();
    return result[0] || null;
  },

  create: async (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> => {
    const newTestimonial = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.insert(testimonials).values(newTestimonial).run();
    return testimonialsService.getById(newTestimonial.id)!;
  },

  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial | null> => {
    db.update(testimonials)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .run();
    return testimonialsService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    db.delete(testimonials).where(eq(testimonials.id, id)).run();
  },
};

// Features service
export const featuresService = {
  getAll: async (): Promise<Feature[]> => {
    return db.select().from(features).all();
  },

  getById: async (id: string): Promise<Feature | null> => {
    const result = db.select().from(features).where(eq(features.id, id)).all();
    return result[0] || null;
  },

  create: async (data: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>): Promise<Feature> => {
    const newFeature = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.insert(features).values(newFeature).run();
    return featuresService.getById(newFeature.id)!;
  },

  update: async (id: string, data: Partial<Feature>): Promise<Feature | null> => {
    db.update(features)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(features.id, id))
      .run();
    return featuresService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    db.delete(features).where(eq(features.id, id)).run();
  },
}; 