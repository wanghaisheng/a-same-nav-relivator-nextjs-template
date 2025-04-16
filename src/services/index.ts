/**
 * Dynamic service implementation based on database environment
 * This file exports the appropriate service implementation based on the NEXT_PUBLIC_DATABASE_ENV
 * environment variable. This allows us to use different database schemas without type conflicts.
 */

// Import service implementations
import * as sqliteServices from './services.sqlite';
import { sqliteAuthService } from './auth.sqlite';

// Import types from SQLite implementation

// Only use sqlite implementation
const services = sqliteServices;
const authServiceImpl = sqliteAuthService;

// Export individual services
export const productsService = services.productsService;

export const categoriesService = services.categoriesService;
export const testimonialsService = services.testimonialsService;
export const coursesService = services.courseItemsService;
export const appsService = services.appItemsService;
export const gamesService = services.gameItemsService;
export const ebooksService = services.ebooksService;
export const authService = authServiceImpl;

// Export database types based on environment using type aliases
// This ensures that components always use types that match the current database implementation
// type DbEnv = 'postgres' | 'sqlite'; // Optional: can be removed if not used elsewhere

// Always export these types regardless of database environment
// export { ItemType, ItemTypeValue };
