# Development Guide

This guide provides step-by-step instructions for adding new features and components to the project.

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Analyzing Requirements and User Flow](#analyzing-requirements-and-user-flow)
3. [Adding a New Page](#adding-a-new-page)
4. [Adding New Components](#adding-new-components)
5. [Adding a New Service](#adding-a-new-service)
6. [Adding a New API Router](#adding-a-new-api-router)
7. [Adding a New Database Schema](#adding-a-new-database-schema)
8. [Testing New Requirements](#testing-new-requirements)

## Project Architecture

### Database Architecture

The project uses a dual-database approach with environment-based configuration:

1. **Development Environment**
   - Uses PostgreSQL with connection pooling for development
   - Schema location: `src/db/postgres/schema/*`
   - Asynchronous operations with `postgres-js`
   - HMR-safe connection caching

2. **Production Environment**
   - Uses PostgreSQL for production deployment
   - Schema location: `src/db/postgres/schema/*`
   - Asynchronous operations
   - Better scalability and feature set

### Database Configuration

#### Environment-Based Configuration
The project uses environment variables to determine database configuration:

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXT_PUBLIC_DATABASE_ENV=postgres  # or sqlite for SQLite mode
```

#### Database Client Setup
The database client is configured with connection pooling and HMR support:

```typescript
// src/db/index.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Cache connection in development
type DbConnection = ReturnType<typeof postgres>;
const globalForDb = globalThis as unknown as {
  conn?: DbConnection;
};

export const conn: DbConnection =
  globalForDb.conn ?? postgres(process.env.DATABASE_URL ?? "");

// Enable connection caching in development
if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

// Database instance with schema
export const db = drizzle(conn, { schema, logger: false });
```

#### Schema Management
The schema is managed with environment-aware exports:

```typescript
// src/db/schema.ts
import * as sqliteSchema from './sqlite/schema';
import * as postgresSchema from './postgres/schema';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { PgTable } from 'drizzle-orm/pg-core';

const env = process.env.NEXT_PUBLIC_DATABASE_ENV;

const getSchema = () => {
  switch (env) {
    case 'postgres':
      return postgresSchema;
    case 'sqlite':
    default:
      return sqliteSchema;
  }
};

export const schema = getSchema();
export const {
  users,
  products,
  categories,
  items
} = schema as {
  users: SQLiteTable | PgTable;
  products: SQLiteTable | PgTable;
  categories: SQLiteTable | PgTable;
  items: SQLiteTable | PgTable;
};
```

### Service Layer Implementation

Services are implemented with proper typing and error handling:

```typescript
// src/services/services.ts
import { items } from '~/db/schema';
import { db } from '~/db';
import { eq } from 'drizzle-orm';

type Item = typeof items.$inferSelect;

export const itemsService = {
  getAll: async (): Promise<Item[]> => {
    try {
      const result = await db.select().from(items);
      return result;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Item | null> => {
    try {
      const [result] = await db
        .select()
        .from(items)
        .where(eq(items.id, id));
      return result || null;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  create: async (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
    try {
      const newItem = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const [result] = await db
        .insert(items)
        .values(newItem)
        .returning();
      return result;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }
};
```

### API Route Implementation

```typescript
// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { db } from "~/db";
import { items } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const data = await db.select().from(items);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const [created] = await db
      .insert(items)
      .values(newItem)
      .returning();
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
```

### Important Notes

1. **Database Operations**
   - All database operations are asynchronous
   - Use `try-catch` blocks for error handling
   - Use proper typing with `$inferSelect`
   - Always handle the case where no results are found

2. **Environment Handling**
   - Check `NEXT_PUBLIC_DATABASE_ENV` for database type
   - Use connection pooling in development
   - Cache database connections for HMR
   - Use proper schema based on environment

3. **Type Safety**
   - Use `$inferSelect` from table definitions
   - Handle nullable fields appropriately
   - Use proper type annotations in services
   - Use type assertions carefully with schema exports

4. **Best Practices**
   - Log errors with proper context
   - Use transactions for multiple operations
   - Validate input data before database operations
   - Keep services focused and modular
   - Use proper error responses in API routes

5. **Testing Considerations**
   - Use a test database for integration tests
   - Mock database operations in unit tests
   - Test error cases and edge conditions
   - Clean up test data after each test
   - Use proper typing in test files

## Analyzing Requirements and User Flow

The process of translating requirements into a working implementation is critical for project success. This section outlines a structured approach to analyze requirements and map them to technical implementations.

### Understanding Requirements

#### 1. Requirement Analysis

Before writing any code, thoroughly analyze the requirements:

1. **Identify Stakeholders** - Determine who will use the feature and their needs
2. **Gather Requirements** - Collect functional and non-functional requirements
3. **Clarify Ambiguities** - Ask questions to resolve any unclear aspects
4. **Define Acceptance Criteria** - Establish clear criteria for when the feature is complete

#### 2. User Story Mapping

Break down requirements into user stories:

```
As a [user type], I want to [action], so that [benefit].
```

For example:
- As a registered user, I want to save my favorite products, so that I can easily find them later.
- As an admin, I want to manage product categories, so that I can organize the product catalog.

#### 3. Feature Prioritization

Prioritize features based on:
- Business value
- Technical complexity
- Dependencies
- User impact

Use techniques like MoSCoW (Must have, Should have, Could have, Won't have) to categorize features.

### User Flow Mapping

#### 1. User Journey Mapping

Create a visual representation of the user's journey:

1. **Identify Entry Points** - How users discover and access the feature
2. **Map User Actions** - List the steps users take to complete tasks
3. **Identify Decision Points** - Where users make choices that affect their path
4. **Document Exit Points** - How users complete or leave the feature

Example user journey for "Save Favorite Product":
```
Browse Products → Select Product → Click Save to Favorites → Receive Confirmation → View Favorites List → Manage Favorites
```

#### 2. Screen Flow Diagrams

Create diagrams showing the relationship between screens:

1. **List All Screens** - Identify all UI screens needed
2. **Map Transitions** - Show how users move between screens
3. **Identify States** - Document different states of each screen
4. **Note Interactions** - Document user interactions on each screen

#### 3. Data Flow Analysis

Analyze how data moves through the system:

1. **Identify Data Entities** - What data is being created, read, updated, or deleted
2. **Map Data Relationships** - How different entities relate to each other
3. **Define Data Validation Rules** - What constraints apply to the data
4. **Document Data Storage Requirements** - How and where data will be stored

### Technical Implementation Planning

#### 1. Component Breakdown

Break down the feature into components:

1. **UI Components** - What visual elements are needed
2. **Service Components** - What business logic services are required
3. **Data Components** - What database schemas and models are needed
4. **API Components** - What endpoints are required

#### 2. Technical Architecture Decisions

Make key technical decisions:

1. **State Management** - How will state be managed (local, global, server)
2. **Data Fetching Strategy** - When and how data will be fetched
3. **Error Handling Approach** - How errors will be handled and displayed
4. **Performance Considerations** - How to optimize for performance

#### 3. Implementation Sequence

Plan the implementation sequence:

1. **Database Schema First** - Start with database schema changes
2. **Service Layer Next** - Implement business logic services
3. **API Routes After** - Create API endpoints
4. **UI Components Last** - Build the user interface components

### Complete Example: Product Detail Page Implementation

Let's walk through a complete example of implementing a product detail page:

#### 1. Requirement Analysis

**User Story:**
```
As a customer, I want to view detailed product information, so that I can make an informed purchase decision.
```

**Acceptance Criteria:**
- Display product name, description, price, and images
- Show product specifications and features
- Display customer reviews and ratings
- Allow adding the product to cart or wishlist
- Show related products

#### 2. User Flow Mapping

**User Journey:**
```
Browse Products → Select Product → View Product Details → 
Read Specifications → Read Reviews → Add to Cart/Wishlist
```

**Screen States:**
- Initial loading state
- Product data loaded state
- Error state (product not found)
- Review section expanded/collapsed

#### 3. Component Breakdown

**UI Components:**
- ProductHeader (name, price, rating)
- ProductGallery (images)
- ProductDescription
- ProductSpecifications
- ProductReviews
- RelatedProducts
- AddToCartButton
- WishlistButton

**API Endpoints:**
- GET /api/products/:id - Get product details
- GET /api/products/:id/reviews - Get product reviews
- POST /api/cart - Add product to cart
- POST /api/wishlist - Add product to wishlist

**Database Schema:**
- Product table with relations to:
  - ProductImages
  - ProductSpecifications
  - ProductReviews
  - RelatedProducts

#### 4. Implementation Plan

**Step 1: Database Schema**
- Create or update product-related schemas in both SQLite and PostgreSQL

**Step 2: Service Layer**
- Implement product service with methods for:
  - getProductById
  - getProductReviews
  - getRelatedProducts

**Step 3: API Routes**
- Implement API endpoints for product data

**Step 4: UI Components**
- Create reusable UI components
- Implement responsive layout

**Step 5: Page Integration**
- Create product detail page
- Integrate components with data fetching

**Step 6: Testing**
- Write unit tests for components
- Write integration tests for API endpoints
- Perform end-to-end testing

#### 5. Implementation Example

**Database Schema:**
```typescript
// src/db/postgres/schema/products.ts
import { pgTable, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  imageUrl: text('image_url'),
  specifications: jsonb('specifications'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productReviews = pgTable('product_reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id),
  userId: text('user_id').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const productRelations = relations(products, ({ many }) => ({
  reviews: many(productReviews),
}));
```

**Service Layer:**
```typescript
// src/services/products.postgres.ts
import { products, productReviews } from '~/db/postgres/schema';
import { postgresDb as db } from '~/db/postgres';
import { eq, desc } from 'drizzle-orm';

type Product = typeof products.$inferSelect;
type ProductReview = typeof productReviews.$inferSelect;

export const productsService = {
  getById: async (id: string): Promise<Product | null> => {
    try {
      const [result] = await db
        .select()
        .from(products)
        .where(eq(products.id, id));
      return result || null;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  getReviews: async (productId: string): Promise<ProductReview[]> => {
    try {
      return db
        .select()
        .from(productReviews)
        .where(eq(productReviews.productId, productId))
        .orderBy(desc(productReviews.createdAt));
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error);
      throw error;
    }
  }
};
```

**API Route:**
```typescript
// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { productsService } from '~/services';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productsService.getById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
```

**UI Component:**
```typescript
// src/ui/components/product-details/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { ProductGallery } from './product-gallery';
import { ProductSpecifications } from './product-specifications';
import { ProductReviews } from './product-reviews';
import { AddToCartButton } from '~/ui/components/add-to-cart-button';
import { WishlistButton } from '~/ui/components/wishlist-button';
import { LoadingSpinner } from '~/ui/components/loading-spinner';
import { ErrorMessage } from '~/ui/components/error-message';

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Error loading product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !product) {
    return <ErrorMessage message={error || 'Product not found'} />;
  }
  
  return (
    <div className="product-details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={product.images || []} />
        
        <div className="product-info">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price / 100}</p>
          
          <div className="flex space-x-4 mt-6 mb-8">
            <AddToCartButton productId={product.id} />
            <WishlistButton productId={product.id} />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <ProductSpecifications specifications={product.specifications || {}} />
      </div>
      
      <div className="mt-12">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
```

**Page Implementation:**
```typescript
// src/app/products/[id]/page.tsx
import { Suspense } from 'react';
import { ProductDetails } from '~/ui/components/product-details';
import { RelatedProducts } from '~/ui/components/related-products';
import { LoadingSpinner } from '~/ui/components/loading-spinner';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <ProductDetails productId={params.id} />
      </Suspense>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <RelatedProducts productId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
```

This example demonstrates the complete flow from requirement analysis to implementation, showing how each layer of the application works together to create a cohesive feature.

## Adding a New Page

### 1. Create the Page Component
```bash
# Create a new page in the app directory
mkdir -p src/app/your-page
touch src/app/your-page/page.tsx
```

### 2. Basic Page Structure
```typescript
// src/app/your-page/page.tsx
"use client";

import { Header } from "~/ui/components/header";
import { YourComponent } from "~/ui/components/your-component";

export default function YourPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          {/* Your page content */}
          <YourComponent />
        </div>
      </main>
    </div>
  );
}
```

### 3. Add Navigation
Update the navigation component to include the new page:
```typescript
// src/ui/components/header.tsx
<Link href="/your-page">Your Page</Link>
```

## Adding New Components

### 1. Create Component Directory
```bash
# Create a new component directory
mkdir -p src/ui/components/your-component
touch src/ui/components/your-component/index.tsx
```

### 2. Component Structure
```typescript
// src/ui/components/your-component/index.tsx
import { cn } from "~/lib/utils";

interface YourComponentProps {
  className?: string;
  // Add other props as needed
}

export function YourComponent({ className, ...props }: YourComponentProps) {
  return (
    <div className={cn("your-base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### 3. Export Component
```typescript
// src/ui/components/index.ts
export * from "./your-component";
```

## Adding a New Service

### Service Layer Architecture

The service layer is a critical part of the application architecture, serving as an intermediary between API routes and database operations. It provides several benefits:

1. **Database Abstraction** - Services hide database implementation details from API routes
2. **Business Logic Encapsulation** - Complex operations are contained in services
3. **Environment Adaptability** - Services adapt to different database environments (SQLite/PostgreSQL)
4. **Reusability** - Services can be used by multiple API routes or client components
5. **Testability** - Services can be easily mocked for testing

### Service Implementation Patterns

The project uses two main patterns for service implementation:

#### Pattern 1: Direct Database Service

This pattern directly interacts with the database:

```typescript
// src/services/services.sqlite.ts or services.postgres.ts
import { items } from '~/db/sqlite/schema'; // or postgres/schema
import { sqliteDb as db } from "~/db/sqlite"; // or postgresDb
import { eq } from 'drizzle-orm';

type Item = typeof items.$inferSelect;

export const itemsService = {
  getAll: async (params?: { search?: string; limit?: number; offset?: number }): Promise<Item[]> => {
    let query = db.select().from(items);
    
    // Apply filters if provided
    if (params?.search) {
      query = query.where(/* your search condition */);
    }
    
    if (params?.limit) {
      query = query.limit(params.limit);
    }
    
    if (params?.offset) {
      query = query.offset(params.offset);
    }
    
    return query.all();
  },

  getById: async (id: string): Promise<Item | null> => {
    const result = await db.select().from(items).where(eq(items.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item | null> => {
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(), // For SQLite (or new Date() for PostgreSQL)
      updatedAt: Date.now(), // For SQLite (or new Date() for PostgreSQL)
    };
    await db.insert(items).values(newItem).run();
    return itemsService.getById(newItem.id);
  },

  update: async (id: string, data: Partial<Item>): Promise<Item | null> => {
    await db.update(items)
      .set({ ...data, updatedAt: Date.now() }) // For SQLite (or new Date() for PostgreSQL)
      .where(eq(items.id, id))
      .run();
    return itemsService.getById(id);
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(items).where(eq(items.id, id)).run();
  },
};
```

#### Pattern 2: Client-Side Service

This pattern is used for client-side data fetching:

```typescript
// src/services/client-services.ts
import { YourType } from "~/db/schema/types";

const API_BASE_URL = "/api";

export const yourClientService = {
  getAll: async (params?: { search?: string; limit?: number; offset?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    
    return fetchApi<YourType[]>(`/your-endpoint?${queryParams.toString()}`);
  },
  
  getById: async (id: string) => {
    return fetchApi<YourType>(`/your-endpoint/${id}`);
  },
  
  create: async (data: Omit<YourType, "id" | "createdAt" | "updatedAt">) => {
    return fetchApi<YourType>("/your-endpoint", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  update: async (id: string, data: Partial<YourType>) => {
    return fetchApi<YourType>(`/your-endpoint/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id: string) => {
    return fetchApi<{ success: boolean }>(`/your-endpoint/${id}`, {
      method: "DELETE",
    });
  },
};
```

### Service Environment Handling

The project uses a dynamic service export pattern to handle different database environments:

```typescript
// src/services/index.ts
import * as sqliteServices from './services.sqlite';
import * as postgresServices from './services.postgres';

// Determine which implementation to use based on environment
const env = process.env.NEXT_PUBLIC_DATABASE_ENV || 'sqlite';

// Export the appropriate service implementation
const services = env === 'postgres' ? postgresServices : sqliteServices;

// Export individual services
export const itemsService = services.itemsService;
export const categoriesService = services.categoriesService;
// ... other services
```

### 1. Create Service File
```bash
# Create a new service file for each database type
touch src/services/your-service.sqlite.ts
touch src/services/your-service.postgres.ts
```

### 2. Service Structure
```typescript
// src/services/your-service.sqlite.ts
import { yourTable } from '~/db/sqlite/schema';
import { sqliteDb as db } from "~/db/sqlite";
import { eq } from 'drizzle-orm';

type YourType = typeof yourTable.$inferSelect;

export const yourService = {
  getAll: async (params?: { search?: string; limit?: number; offset?: number }): Promise<YourType[]> => {
    // Implementation for SQLite
    // ...
  },
  
  getById: async (id: string): Promise<YourType | null> => {
    // Implementation for SQLite
    // ...
  },
  
  // Other methods
};
```
```

## Adding a New API Router

### API Router Architecture

The project follows a layered architecture for API routes:

1. **API Routes Layer** - Handles HTTP requests and responses
2. **Service Layer** - Contains business logic and database operations
3. **Database Layer** - Manages database connections and schema

This separation of concerns allows for:
- Better testability of each layer
- Easier switching between database implementations
- Reusable business logic across different API endpoints
- Consistent error handling and response formatting

### API Router Implementation Patterns

The project supports two main patterns for implementing API routes:

#### Pattern 1: Direct Service Integration

This pattern uses the service layer directly in API routes:

```typescript
// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { itemsService } from "~/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : undefined;
    
    const items = await itemsService.getAll({ search, limit, offset });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const item = await itemsService.create(data);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
```

#### Pattern 2: Handler Adapter Pattern

For more complex authentication or specialized APIs, the project uses adapter patterns:

```typescript
// src/app/api/auth/[...all]/route.ts
import { toNextJsHandler } from "better-auth/next-js";
import { authService } from "~/services";

export const { POST, GET } = toNextJsHandler(authService);
```

This pattern adapts a service to Next.js API routes using a handler adapter function.

### 1. Create API Route
```bash
# Create a new API route directory
mkdir -p src/app/api/your-endpoint
touch src/app/api/your-endpoint/route.ts
```

### 2. API Route Structure Using Services
```typescript
// src/app/api/your-endpoint/route.ts
import { NextResponse } from "next/server";
import { yourService } from "~/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : undefined;
    
    const items = await yourService.getAll({ search, limit, offset });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const item = await yourService.create(data);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
```

## Adding a New Database Schema

### Database Schema Architecture

The project uses a dual-database approach with parallel schema definitions:

1. **SQLite Schema** - Used for development and testing
   - Located in `src/db/sqlite/schema/`
   - Uses SQLite-specific data types and constraints
   - Optimized for local development

2. **PostgreSQL Schema** - Used for production
   - Located in `src/db/postgres/schema/`
   - Uses PostgreSQL-specific data types and features
   - Optimized for production workloads

### Database-Service Integration

The database schema and service layer are tightly integrated:

1. **Type Inference** - Services use `$inferSelect` and `$inferInsert` from schema definitions
2. **Environment Switching** - Services adapt to the current database environment
3. **Consistent Patterns** - Both database implementations follow the same patterns

```typescript
// Example of service-database integration
import { items } from '~/db/sqlite/schema'; // or postgres/schema
import { sqliteDb as db } from "~/db/sqlite"; // or postgresDb

// Type inference from schema
type Item = typeof items.$inferSelect;

// Service using the database and types
export const itemsService = {
  getAll: async (): Promise<Item[]> => {
    return db.select().from(items).all();
  },
  // Other methods...
};
```

### 1. Create Schema Files
```bash
# Create schema files for both SQLite and PostgreSQL
touch src/db/sqlite/schema/your-table.ts
touch src/db/postgres/schema/your-table.ts
```

### 2. SQLite Schema Structure
```typescript
// src/db/sqlite/schema/your-table.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const yourTable = sqliteTable("your_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // Add other fields as needed
  createdAt: integer("created_at", { mode: "timestamp" }).$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$default(() => new Date()),
});

// Export types for service usage
export type YourTable = typeof yourTable.$inferSelect;
export type NewYourTable = typeof yourTable.$inferInsert;
```

### 3. PostgreSQL Schema Structure
```typescript
// src/db/postgres/schema/your-table.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const yourTable = pgTable("your_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // Add other fields as needed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Export types for service usage
export type YourTable = typeof yourTable.$inferSelect;
export type NewYourTable = typeof yourTable.$inferInsert;
```

### 4. Update Schema Index Files
```typescript
// src/db/sqlite/schema/index.ts and src/db/postgres/schema/index.ts
export * from "./your-table";
```

### 5. Create Service Implementation

After defining your schema, create the corresponding service implementation:

```typescript
// src/services/your-service.sqlite.ts
import { yourTable } from '~/db/sqlite/schema';
import { sqliteDb as db } from "~/db/sqlite";
import { eq } from 'drizzle-orm';

// Use the type from the schema
type YourTable = typeof yourTable.$inferSelect;

export const yourService = {
  getAll: async (): Promise<YourTable[]> => {
    return db.select().from(yourTable).all();
  },
  
  getById: async (id: string): Promise<YourTable | null> => {
    const result = await db.select().from(yourTable).where(eq(yourTable.id, id)).all();
    return result.length > 0 ? result[0] : null;
  },
  
  // Other CRUD operations...
};
```

### 6. Update Service Index

Finally, update the service index to export your new service:

```typescript
// src/services/index.ts
import * as sqliteServices from './services.sqlite';
import * as postgresServices from './services.postgres';

const env = process.env.NEXT_PUBLIC_DATABASE_ENV || 'sqlite';
const services = env === 'postgres' ? postgresServices : sqliteServices;

// Export existing services
export const itemsService = services.itemsService;
// ... other services

// Export your new service
export const yourService = services.yourService;
```

## Testing New Requirements

### 1. Create Test Directory
```bash
# Create a test directory for your feature
mkdir -p src/__tests__/your-feature
touch src/__tests__/your-feature/your-feature.test.tsx
```

### 2. Test Structure
```typescript
// src/__tests__/your-feature/your-feature.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { YourComponent } from "~/ui/components/your-component";
import { YourPage } from "~/app/your-page/page";

describe("Your Feature", () => {
  describe("YourComponent", () => {
    it("renders correctly", () => {
      render(<YourComponent />);
      expect(screen.getByText("Expected Text")).toBeInTheDocument();
    });

    it("handles user interaction", () => {
      render(<YourComponent />);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByText("Updated Text")).toBeInTheDocument();
    });
  });

  describe("YourPage", () => {
    it("loads and displays data", async () => {
      render(<YourPage />);
      expect(await screen.findByText("Loading...")).toBeInTheDocument();
      expect(await screen.findByText("Your Data")).toBeInTheDocument();
    });
  });
});
```

### 3. API Tests
```typescript
// src/__tests__/api/your-endpoint.test.ts
import { db } from "~/db";
import { yourTable } from "~/db/schema";

describe("Your API Endpoint", () => {
  beforeEach(async () => {
    // Clear the table before each test
    await db.delete(yourTable);
  });

  it("creates a new item", async () => {
    const response = await fetch("/api/your-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Item" }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.name).toBe("Test Item");
  });

  it("fetches items", async () => {
    // Add test data
    await db.insert(yourTable).values({ name: "Test Item" });

    const response = await fetch("/api/your-endpoint");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveLength(1);
    expect(data[0].name).toBe("Test Item");
  });
});
```

### 4. Database Tests
```typescript
// src/__tests__/db/your-table.test.ts
import { db } from "~/db";
import { yourTable } from "~/db/schema";

describe("Your Table", () => {
  beforeEach(async () => {
    await db.delete(yourTable);
  });

  it("inserts and retrieves data", async () => {
    const [item] = await db
      .insert(yourTable)
      .values({ name: "Test Item" })
      .returning();

    const result = await db.select().from(yourTable);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Test Item");
  });
});
```

## Best Practices

### API Router-Service-Database Interaction

1. **Layered Architecture**
   - API Routes should only handle HTTP concerns (request parsing, response formatting)
   - Services should contain all business logic and database operations
   - Database layer should focus on schema definitions and connections
   - Maintain clear separation between these layers

2. **Service Pattern Implementation**
   - Use environment-aware service exports (see `src/services/index.ts`)
   - Implement parallel service files for different database environments
   - Keep service interfaces consistent across implementations
   - Use dependency injection for database connections

3. **Database Schema Management**
   - Maintain parallel schemas for SQLite and PostgreSQL
   - Use appropriate data types for each database
   - Keep schema structures consistent between environments
   - Test migrations in both database systems
   - Export types from schema files using `$inferSelect` and `$inferInsert`

4. **Type Safety**
   - Always use TypeScript types from schema definitions
   - Use proper type annotations in components and services
   - Handle nullable fields appropriately
   - Use type guards when necessary for database-specific behavior

5. **Error Handling**
   - Implement consistent error handling across all layers:
     ```typescript
     // API Route Layer
     export async function GET(request: Request) {
       try {
         const data = await yourService.getAll();
         return NextResponse.json(data);
       } catch (error) {
         console.error("Error in API route:", error);
         return NextResponse.json(
           { error: "Failed to process request" },
           { status: 500 }
         );
       }
     }
     
     // Service Layer
     getAll: async (): Promise<YourType[]> => {
       try {
         const result = await db.select().from(yourTable).all();
         return result;
       } catch (error) {
         console.error("Database error:", error);
         throw new Error("Failed to fetch data");
       }
     }
     ```
   - Use specific error types for different failure scenarios
   - Log detailed errors in services but return sanitized errors to clients
   - Handle database-specific errors appropriately

6. **Code Organization**
   - Follow the established directory structure
   - Keep components small and focused
   - Use proper naming conventions
   - Maintain clear separation between database implementations

7. **Testing**
   - Write tests for each layer (API, service, database)
   - Test both success and error cases
   - Mock database operations in service tests
   - Test with both SQLite and PostgreSQL configurations
   - Use integration tests to verify the complete flow

8. **Documentation**
   - Add comments for complex logic
   - Document API endpoints with expected inputs and outputs
   - Keep this guide updated with new patterns
   - Document database-specific considerations

### API Router-Service-Database Flow

The typical flow of a request through the application is:

1. **Client Request** → API Route receives HTTP request
2. **API Route** → Parses request and calls appropriate service method
3. **Service Layer** → Applies business logic and performs database operations
4. **Database Layer** → Executes queries and returns results
5. **Service Layer** → Processes database results and handles errors
6. **API Route** → Formats response and handles service errors
7. **Client Response** ← Receives formatted HTTP response

This flow ensures separation of concerns and makes the codebase more maintainable and testable.

### API Request Processing Lifecycle

A complete API request processing lifecycle includes these steps:

1. **Request Validation**
   - Validate query parameters, headers, and body
   - Check authentication and authorization
   - Sanitize inputs to prevent injection attacks

2. **Service Delegation**
   - Map HTTP methods to appropriate service methods
   - Transform HTTP-specific data to domain models
   - Handle pagination, filtering, and sorting parameters

3. **Business Logic Processing**
   - Apply domain-specific rules in the service layer
   - Perform data transformations and calculations
   - Coordinate multiple database operations if needed

4. **Database Interaction**
   - Execute optimized queries with proper indexes
   - Use transactions for multi-step operations
   - Handle database-specific error conditions

5. **Response Formatting**
   - Transform domain models to API response format
   - Apply consistent response structure
   - Include appropriate HTTP status codes
   - Add pagination metadata when applicable

### API Security Best Practices

1. **Input Validation**
   - Validate all input parameters using Zod or similar validation libraries
   - Example:
     ```typescript
     // src/lib/validators/item.ts
     import { z } from 'zod';
     
     export const createItemSchema = z.object({
       name: z.string().min(1).max(100),
       description: z.string().optional(),
       price: z.number().positive(),
       categoryId: z.string().uuid()
     });
     
     // In API route
     import { createItemSchema } from '~/lib/validators/item';
     
     export async function POST(request: Request) {
       try {
         const body = await request.json();
         const validatedData = createItemSchema.parse(body);
         const item = await itemsService.create(validatedData);
         return NextResponse.json(item);
       } catch (error) {
         if (error instanceof z.ZodError) {
           return NextResponse.json(
             { error: 'Validation error', details: error.errors },
             { status: 400 }
           );
         }
         // Handle other errors
       }
     }
     ```

2. **Authentication & Authorization**
   - Use middleware for authentication checks
   - Implement role-based access control in services
   - Example:
     ```typescript
     // src/middleware.ts
     import { NextResponse } from 'next/server';
     import type { NextRequest } from 'next/server';
     import { verifyAuth } from '~/lib/auth';
     
     export async function middleware(request: NextRequest) {
       const authResult = await verifyAuth(request);
       
       if (!authResult.isAuthenticated) {
         return NextResponse.json(
           { error: 'Unauthorized' },
           { status: 401 }
         );
       }
       
       return NextResponse.next();
     }
     
     export const config = {
       matcher: '/api/((?!public).*)',
     };
     ```

3. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Use Redis or similar for distributed rate limiting
   - Example with middleware:
     ```typescript
     // Add to middleware.ts
     import { rateLimit } from '~/lib/rate-limit';
     
     export async function middleware(request: NextRequest) {
       // Existing auth code...
       
       // Apply rate limiting
       const rateLimitResult = await rateLimit(request);
       if (!rateLimitResult.success) {
         return NextResponse.json(
           { error: 'Too many requests' },
           { status: 429, headers: rateLimitResult.headers }
         );
       }
       
       return NextResponse.next();
     }
     ```

4. **Error Handling Strategy**
   - Use consistent error response format
   - Include appropriate HTTP status codes
   - Log detailed errors but return sanitized responses
   - Example error handling utility:
     ```typescript
     // src/lib/api-error.ts
     export class ApiError extends Error {
       constructor(
         public message: string,
         public statusCode: number,
         public details?: any
       ) {
         super(message);
       }
     }
     
     export function handleApiError(error: unknown) {
       console.error('API error:', error);
       
       if (error instanceof ApiError) {
         return NextResponse.json(
           { error: error.message, details: error.details },
           { status: error.statusCode }
         );
       }
       
       // Default error response
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
     
     // Usage in API route
     export async function GET(request: Request) {
       try {
         // API logic
       } catch (error) {
         return handleApiError(error);
       }
     }
     ```

### Advanced API Patterns

1. **Pagination Implementation**
   - Use cursor-based pagination for large datasets
   - Include pagination metadata in responses
   - Example:
     ```typescript
     // Service implementation
     export const itemsService = {
       getAll: async (params: {
         cursor?: string;
         limit?: number;
         direction?: 'next' | 'prev';
       }): Promise<{
         items: Item[];
         nextCursor?: string;
         prevCursor?: string;
       }> => {
         const limit = params.limit || 10;
         let query = db.select().from(items).limit(limit + 1);
         
         if (params.cursor) {
           const cursorObj = decodeCursor(params.cursor);
           if (params.direction === 'prev') {
             query = query.where(lt(items.id, cursorObj.id)).orderBy(desc(items.id));
           } else {
             query = query.where(gt(items.id, cursorObj.id)).orderBy(asc(items.id));
           }
         } else {
           query = query.orderBy(asc(items.id));
         }
         
         const results = await query;
         const hasMore = results.length > limit;
         const items = hasMore ? results.slice(0, limit) : results;
         
         let nextCursor, prevCursor;
         if (hasMore) {
           nextCursor = encodeCursor({ id: items[items.length - 1].id });
         }
         if (params.cursor) {
           prevCursor = encodeCursor({ id: items[0].id });
         }
         
         return { items, nextCursor, prevCursor };
       }
     };
     
     // API route implementation
     export async function GET(request: Request) {
       const { searchParams } = new URL(request.url);
       const cursor = searchParams.get('cursor');
       const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
       const direction = searchParams.get('direction') as 'next' | 'prev' | undefined;
       
       const { items, nextCursor, prevCursor } = await itemsService.getAll({
         cursor,
         limit,
         direction
       });
       
       return NextResponse.json({
         items,
         pagination: {
           nextCursor,
           prevCursor
         }
       });
     }
     ```

2. **Caching Strategy**
   - Implement response caching for frequently accessed data
   - Use cache headers for client-side caching
   - Example with Redis caching:
     ```typescript
     // src/lib/cache.ts
     import { Redis } from '@upstash/redis';
     
     const redis = new Redis({
       url: process.env.REDIS_URL!,
       token: process.env.REDIS_TOKEN!,
     });
     
     export async function cachedFetch<T>(
       key: string,
       fetchFn: () => Promise<T>,
       ttl: number = 60 // seconds
     ): Promise<T> {
       // Try to get from cache
       const cached = await redis.get<T>(key);
       if (cached) return cached;
       
       // Fetch fresh data
       const data = await fetchFn();
       
       // Store in cache
       await redis.set(key, data, { ex: ttl });
       
       return data;
     }
     
     // Usage in service
     export const itemsService = {
       getAll: async (): Promise<Item[]> => {
         return cachedFetch<Item[]>(
           'items:all',
           async () => db.select().from(items).all(),
           300 // 5 minutes
         );
       }
     };
     ```

3. **Webhook Implementation**
   - Use a queue for processing webhook events
   - Implement retry logic for failed webhook deliveries
   - Example:
     ```typescript
     // src/app/api/webhooks/route.ts
     import { NextResponse } from 'next/server';
     import { webhookQueue } from '~/lib/queue';
     
     export async function POST(request: Request) {
       const signature = request.headers.get('x-signature');
       const body = await request.text();
       
       // Verify webhook signature
       if (!verifySignature(body, signature)) {
         return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
       }
       
       // Queue webhook for processing
       await webhookQueue.add('process-webhook', {
         body: JSON.parse(body),
         receivedAt: new Date().toISOString()
       });
       
       return NextResponse.json({ received: true });
     }
     ```
