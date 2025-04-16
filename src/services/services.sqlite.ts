import { sqliteDb as db } from "~/db/sqlite";
import { eq } from 'drizzle-orm';
import { ebookItems } from '~/db/sqlite/schema/ebook_items';
import { categories } from '~/db/sqlite/schema/categories';
import { products } from '~/db/sqlite/schema/products';
import { testimonials } from '~/db/sqlite/schema/testimonials';
import { appItems } from '~/db/sqlite/schema/app_items';
import { courseItems } from '~/db/sqlite/schema/course_items';
import { gameItems } from '~/db/sqlite/schema/game_items';
import { otherItems } from '~/db/sqlite/schema/other_items';
import { websiteItems } from '~/db/sqlite/schema/website_items';
import type { 
  EbookItem, NewEbookItem, 
  Category, NewCategory, 
  Product, NewProduct, 
  Testimonial, NewTestimonial, 
  AppItem, NewAppItem, 
  CourseItem, NewCourseItem, 
  GameItem, NewGameItem, 
  OtherItem, NewOtherItem, 
  WebsiteItem, NewWebsiteItem 
} from '@/db/types';

// Ebooks service
export const ebooksService = {
  // 新增电子书
  create: async (data: Omit<NewEbookItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<EbookItem | null> => {
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
    };
    await db.insert(ebookItems).values(newItem).run();
    return ebooksService.getById(newItem.id);
  },

  // 获取所有电子书
  getAll: async (): Promise<EbookItem[]> => {
    return db.select().from(ebookItems).all();
  },

  // 根据ID获取电子书
  getById: async (id: string): Promise<EbookItem | null> => {
    const result = await db.select().from(ebookItems).where(eq(ebookItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
  // 可按需扩展更多方法
};

// Categories service
export const categoriesService = {
  create: async (data: Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(categories).values(newItem).run();
    return categoriesService.getById(newItem.id);
  },
  getAll: async (): Promise<Category[]> => db.select().from(categories).all(),
  getById: async (id: string): Promise<Category | null> => {
    const result = await db.select().from(categories).where(eq(categories.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// Products service
export const productsService = {
  create: async (data: Omit<NewProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(products).values(newItem).run();
    return productsService.getById(newItem.id);
  },
  getAll: async (): Promise<Product[]> => db.select().from(products).all(),
  getById: async (id: string): Promise<Product | null> => {
    const result = await db.select().from(products).where(eq(products.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// Testimonials service
export const testimonialsService = {
  create: async (data: Omit<NewTestimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(testimonials).values(newItem).run();
    return testimonialsService.getById(newItem.id);
  },
  getAll: async (): Promise<Testimonial[]> => db.select().from(testimonials).all(),
  getById: async (id: string): Promise<Testimonial | null> => {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// App Items service
export const appItemsService = {
  create: async (data: Omit<NewAppItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<AppItem | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(appItems).values(newItem).run();
    return appItemsService.getById(newItem.id);
  },
  getAll: async (): Promise<AppItem[]> => db.select().from(appItems).all(),
  getById: async (id: string): Promise<AppItem | null> => {
    const result = await db.select().from(appItems).where(eq(appItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// Course Items service
export const courseItemsService = {
  create: async (data: Omit<NewCourseItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CourseItem | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(courseItems).values(newItem).run();
    return courseItemsService.getById(newItem.id);
  },
  getAll: async (): Promise<CourseItem[]> => db.select().from(courseItems).all(),
  getById: async (id: string): Promise<CourseItem | null> => {
    const result = await db.select().from(courseItems).where(eq(courseItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
  /**
   * 获取课程详情并进行字段预处理（features、specs、价格、讲师、课程大纲等）
   */
  getByIdWithDefaults: async (id: string): Promise<any | null> => {
    const course = await courseItemsService.getById(id);
    if (!course) return null;
    const features = course.features ? JSON.parse(course.features as string) : [];
    const specs = course.specs ? JSON.parse(course.specs as string) : {};
    const originalPrice = course.originalPrice || Number(course.price) * 1.2;
    return {
      ...course,
      price: Number(course.price),
      originalPrice: Number(originalPrice),
      rating: course.rating ? Number(course.rating) : 4.0,
      features,
      specs,
      duration: course.duration ? Number(course.duration) : 0,
      level: course.level || "初级",
      certification: Boolean(course.certification),
      instructor: course.instructor || {
        name: "专业讲师",
        bio: "拥有多年教学经验的资深讲师",
        avatar: "/placeholder-avatar.jpg"
      },
      curriculum: course.curriculum || [
        { title: "课程介绍", duration: 15, preview: true },
        { title: "基础概念", duration: 45, preview: false },
        { title: "核心技术", duration: 60, preview: false },
        { title: "实战项目", duration: 90, preview: false },
        { title: "总结与展望", duration: 30, preview: false }
      ],
      students: course.students || 1250,
      lastUpdated: course.lastUpdated || "2023-12-01"
    };
  },
};

// Game Items service
export const gameItemsService = {
  create: async (data: Omit<NewGameItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameItem | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(gameItems).values(newItem).run();
    return gameItemsService.getById(newItem.id);
  },
  getAll: async (): Promise<GameItem[]> => db.select().from(gameItems).all(),
  getById: async (id: string): Promise<GameItem | null> => {
    const result = await db.select().from(gameItems).where(eq(gameItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// Other Items service
export const otherItemsService = {
  create: async (data: Omit<NewOtherItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<OtherItem | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(otherItems).values(newItem).run();
    return otherItemsService.getById(newItem.id);
  },
  getAll: async (): Promise<OtherItem[]> => db.select().from(otherItems).all(),
  getById: async (id: string): Promise<OtherItem | null> => {
    const result = await db.select().from(otherItems).where(eq(otherItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};

// Website Items service
export const websiteItemsService = {
  create: async (data: Omit<NewWebsiteItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<WebsiteItem | null> => {
    const newItem = { ...data, id: crypto.randomUUID() };
    await db.insert(websiteItems).values(newItem).run();
    return websiteItemsService.getById(newItem.id);
  },
  getAll: async (): Promise<WebsiteItem[]> => db.select().from(websiteItems).all(),
  getById: async (id: string): Promise<WebsiteItem | null> => {
    const result = await db.select().from(websiteItems).where(eq(websiteItems.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
};
