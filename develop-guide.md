# Development Guide

This guide provides step-by-step instructions for adding new features and components to the project.

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Adding a New Page](#adding-a-new-page)
3. [Adding New Components](#adding-new-components)
4. [Adding a New Service](#adding-a-new-service)
5. [Adding a New API Router](#adding-a-new-api-router)
6. [Adding a New Database Schema](#adding-a-new-database-schema)
7. [Testing New Requirements](#testing-new-requirements)

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

### 1. Create Service File
```bash
# Create a new service file
touch src/services/your-service.ts
```

### 2. Service Structure
```typescript
// src/services/your-service.ts
import { YourType } from "~/db/schema/types";

const API_BASE_URL = "/api";

export const yourService = {
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

## Adding a New API Router

### 1. Create API Route
```bash
# Create a new API route directory
mkdir -p src/app/api/your-endpoint
touch src/app/api/your-endpoint/route.ts
```

### 2. API Route Structure
```typescript
// src/app/api/your-endpoint/route.ts
import { NextResponse } from "next/server";
import { db } from "~/db";
import { yourTable } from "~/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const query = db.select().from(yourTable);
    
    if (search) {
      query.where(/* your search condition */);
    }
    
    if (limit) {
      query.limit(Number(limit));
    }
    
    if (offset) {
      query.offset(Number(offset));
    }

    const items = await query;
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
    const [item] = await db.insert(yourTable).values(data).returning();
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
```

### 4. Update Schema Index Files
```typescript
// src/db/sqlite/schema/index.ts and src/db/postgres/schema/index.ts
export * from "./your-table";
```

### 5. Update Types
```typescript
// src/db/schema/types.ts
import { YourType as SQLiteYourType } from "../sqlite/schema/your-table";
import { YourType as PgYourType } from "../postgres/schema/your-table";

export type YourType = SQLiteYourType | PgYourType;
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

1. **Database Schema Management**
   - Maintain parallel schemas for SQLite and PostgreSQL
   - Use appropriate data types for each database
   - Keep schema structures consistent between environments
   - Test migrations in both database systems

2. **Type Safety**
   - Always use TypeScript types
   - Export types from schema files
   - Use proper type annotations in components and services
   - Handle type differences between SQLite and PostgreSQL

3. **Error Handling**
   - Implement proper error handling in API routes
   - Use try-catch blocks in async operations
   - Provide meaningful error messages
   - Handle database-specific errors appropriately

4. **Code Organization**
   - Follow the established directory structure
   - Keep components small and focused
   - Use proper naming conventions
   - Maintain clear separation between database implementations

5. **Testing**
   - Write tests for new features
   - Test both success and error cases
   - Mock external dependencies in tests
   - Test with both SQLite and PostgreSQL configurations

6. **Documentation**
   - Add comments for complex logic
   - Document API endpoints
   - Keep this guide updated with new patterns
   - Document database-specific considerations
