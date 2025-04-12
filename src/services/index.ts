/**
 * Dynamic service implementation based on database environment
 * This file exports the appropriate service implementation based on the NEXT_PUBLIC_DATABASE_ENV
 * environment variable. This allows us to use different database schemas without type conflicts.
 */

// Import service implementations
import * as sqliteServices from './services.sqlite';
import * as postgresServices from './services.postgres';
import {postgresAuthService} from './auth.postgres';
import {sqliteAuthService} from './auth.sqlite';

// Determine which implementation to use based on environment
const env = process.env.NEXT_PUBLIC_DATABASE_ENV || 'sqlite';

// Export the appropriate service implementation
const services = env === 'postgres' ? postgresServices : sqliteServices;
const authServiceImpl = env === 'postgres' ? postgresAuthService : sqliteAuthService;


// Export individual services
export const itemsService = services.itemsService;
export const categoriesService = services.categoriesService;
export const testimonialsService = services.testimonialsService;
export const featuresService = services.featuresService;
export const authService = authServiceImpl;
