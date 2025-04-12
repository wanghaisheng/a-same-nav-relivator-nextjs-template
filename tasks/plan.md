# API and Database Implementation Plan

## Overview
This plan outlines the implementation of API endpoints and database schema for the e-commerce application, focusing on products and items management, with support for both SQLite (development) and PostgreSQL (production) databases.

## 1. Database Schema Implementation

### 1.1 Products Schema
Location: `src/db/schema/products.ts`
```typescript
// Product schema definition
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  image: text('image').notNull(),
  category: text('category').notNull(),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  inStock: boolean('in_stock').default(true),
  description: text('description'),
  features: jsonb('features').$type<string[]>(),
  specs: jsonb('specs').$type<Record<string, string>>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### 1.2 Categories Schema
Location: `src/db/schema/categories.ts`
```typescript
// Category schema definition
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  productCount: integer('product_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### 1.3 Update Schema Index
Location: `src/db/schema/index.ts`
```typescript
export * from './users';
export * from './products';
export * from './categories';
```

## 2. API Implementation

### 2.1 Products API
Location: `src/app/api/products/route.ts`
```typescript
// GET /api/products
// GET /api/products?category=categoryName
// GET /api/products/:id
```

### 2.2 Categories API
Location: `src/app/api/categories/route.ts`
```typescript
// GET /api/categories
// GET /api/categories/:id
```

## 3. Implementation Steps

### Phase 0: Dual Database Configuration
1. Configure database environments:
   - Set up SQLite for development
   - Maintain PostgreSQL for production
2. Update database connection logic:
   - Implement environment-based switching
   - Add SQLite connection handling
   - Maintain PostgreSQL connection pooling
3. Set up migration paths:
   - Create separate migration directories for SQLite and PostgreSQL
   - Update migration scripts
4. Environment configuration:
   - Add SQLite database path settings
   - Document database configuration

### Phase 1: Database Setup
1. Create new schema files:
   - `src/db/schema/products.ts`
   - `src/db/schema/categories.ts`
2. Update schema index file
3. Run database migrations
4. Seed initial data

### Phase 2: API Implementation
1. Create API routes:
   - Products endpoints
   - Categories endpoints
2. Implement data fetching logic
3. Add error handling
4. Add type definitions

### Phase 3: Integration
1. Update existing pages to use new API endpoints
2. Add loading states
3. Implement error boundaries
4. Add data caching

## 4. Testing Plan

### 4.1 Database Tests
- Schema validation
- Data integrity
- Relationship constraints

### 4.2 API Tests
- Endpoint functionality
- Error handling
- Response formats
- Query parameters

### 4.3 Integration Tests
- Page loading
- Data fetching
- Error states
- Loading states

## 5. Timeline

### Day 1
- Database schema implementation
- Initial migrations
- Data seeding

### Day 2
- API endpoint implementation
- Basic error handling
- Type definitions

### Day 3
- Integration with existing pages
- Testing
- Documentation

## 6. Dependencies
- drizzle-orm
- postgres
- next.js API routes
- TypeScript

## 7. Notes
- Ensure proper error handling
- Implement proper TypeScript types
- Add API documentation
- Consider caching strategies
- Implement proper security measures

## 8. Future Considerations
- Add pagination
- Implement search functionality
- Add filtering options
- Consider implementing a cache layer
- Add rate limiting

## 9. Dual Database Configuration

### 9.1 Environment Configuration
Location: `.env`
```env
# Development (SQLite)
SQLITE_DB_PATH="sqlite.db"

# Production (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/db"
```

### 9.2 Database Connection
Location: `src/db/index.ts`
```typescript
// Environment-based database connection
const isDevelopment = process.env.NODE_ENV === "development";

// SQLite for development
if (isDevelopment) {
  const sqlite = new Database(process.env.SQLITE_DB_PATH ?? "sqlite.db");
  db = drizzleSQLite(sqlite, { schema });
}

// PostgreSQL for production
else {
  const conn = postgres(process.env.DATABASE_URL ?? "");
  db = drizzle(conn, { schema });
}
```

### 9.3 Migration Configuration
Location: `drizzle.config.ts`
```typescript
export default defineConfig({
  schema: "./src/db/schema/index.ts",
  dialect: isDevelopment ? "sqlite" : "postgresql",
  out: isDevelopment ? "./src/db/migrations/sqlite" : "./src/db/migrations/postgres",
});
```

### 9.4 Implementation Tasks
1. Dependencies:
   - Install SQLite dependencies
   - Configure type definitions
2. Database Setup:
   - Create SQLite database file
   - Set up PostgreSQL connection
3. Migration Management:
   - Create migration scripts for both databases
   - Test migration process in both environments
4. Testing:
   - Verify database switching logic
   - Test data operations in both environments
   - Validate migration processes

### 9.5 Considerations
- Ensure schema compatibility between SQLite and PostgreSQL
- Handle database-specific features appropriately
- Implement proper error handling for both databases
- Document database-specific limitations
- Consider data migration between environments 