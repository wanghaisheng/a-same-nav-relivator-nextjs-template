/**
 * Dynamic service implementation based on database environment
 * This file exports the appropriate service implementation based on the NEXT_PUBLIC_DATABASE_ENV
 * environment variable. This allows us to use different database schemas without type conflicts.
 */

// Import service implementations
import * as sqliteServices from './services.sqlite';
import { sqliteAuthService } from './auth.sqlite';

// Import types from SQLite implementation
import type { Item as SQLiteItem, Category as SQLiteCategory, Testimonial as SQLiteTestimonial, Feature as SQLiteFeature } from './services.sqlite';
import type { ItemType, ItemTypeValue } from '~/db/sqlite/schema/items';

// Only use sqlite implementation
const services = sqliteServices;
const authServiceImpl = sqliteAuthService;

// Export individual services
export const itemsService = services.itemsService;
export const productsService = services.itemsService;

export const categoriesService = services.categoriesService;
export const testimonialsService = services.testimonialsService;
export const featuresService = services.featuresService;
export const coursesService = services.coursesService;
export const appsService = services.appsService;
export const gamesService = services.gamesService;
export const ebooksService = services.ebooksService;
export const authService = authServiceImpl;

// Export database types based on environment using type aliases
// This ensures that components always use types that match the current database implementation
// type DbEnv = 'postgres' | 'sqlite'; // Optional: can be removed if not used elsewhere

// Always export these types regardless of database environment
// export { ItemType, ItemTypeValue };
