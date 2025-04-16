# Development Guide

This guide provides step-by-step instructions for adding new features and components to the project.

确保了即使数据中存在null值，组件也能正常渲染，不会因为空值引用导致错误，同时为用户提供了更友好的界面体验。



## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Analyzing Requirements and User Flow](#analyzing-requirements-and-user-flow)
3. [Adding a New Page](#adding-a-new-page)
4. [Adding New Components](#adding-new-components)
5. [Adding a New Service](#adding-a-new-service)
6. [Adding a New API Router](#adding-a-new-api-router)
7. [Adding a New Database Schema](#adding-a-new-database-schema)
8. [Testing New Requirements](#testing-new-requirements)
9. [Server and Client Component Interaction](#server-and-client-component-interaction)

## Project Architecture

### Database Architecture

The project uses a dual-database approach with environment-based configuration, allowing seamless switching between SQLite and PostgreSQL:

1. **Development Environment Options**
   - **PostgreSQL**: Used for development with full feature set
     - Schema location: `src/db/postgres/schema/*`
     - Connection via `postgres-js` with connection pooling
     - Asynchronous operations with proper error handling
     - HMR-safe connection caching
     - Full support for complex queries and relationships
   
   - **SQLite**: Lightweight alternative for local development
     - Schema location: `src/db/sqlite/schema/*`
     - Connection via `better-sqlite3`
     - Simplified setup with no external database required
     - File-based storage in `sqlite.db`
     - Suitable for rapid development and testing

2. **Production Environment**
   - Uses PostgreSQL for production deployment
   - Schema location: `src/db/postgres/schema/*`
   - Optimized for performance and scalability
   - Full support for complex queries and relationships
   - Transaction support for data integrity
   - Proper error handling and connection management

### Database Configuration

#### Environment-Based Configuration
The project uses environment variables to determine database configuration, allowing dynamic switching between database types:

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXT_PUBLIC_DATABASE_ENV=postgres  # or sqlite for SQLite mode
SQLITE_DB_PATH=sqlite.db  # Optional: path to SQLite database file
```

These environment variables control which database implementation is used throughout the application. The `NEXT_PUBLIC_DATABASE_ENV` variable is particularly important as it determines which service implementations are exported from the services layer.

#### Database Client Setup
The database client is configured with separate implementations for PostgreSQL and SQLite:

```typescript
// src/db/postgres/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/relivator";
const client = postgres(connectionString);
export const postgresDb = drizzle(client);
```

```typescript
// src/db/sqlite/index.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.SQLITE_DB_PATH ?? "sqlite.db");
export const db = drizzle(sqlite, { schema });

export const sqliteDb = drizzle(sqlite);
```

This approach allows for easy switching between database implementations while maintaining type safety and consistent interfaces.

#### Schema Management
The schema is managed with separate implementations for PostgreSQL and SQLite, with each database type having its own schema definitions:

```typescript
// src/db/postgres/schema/index.ts
export * from './users';
export * from './items';
export * from './products';
export * from './categories';
export * from './features';
export * from './testimonials';
```

```typescript
// src/db/sqlite/schema/index.ts
export * from './users';
export * from './items';
export * from './products';
export * from './categories';
export * from './features';
export * from './testimonials';
```

#### Seed Data Management
The project includes seed data for all database tables to provide initial content for development and testing. Seed files are implemented for both PostgreSQL and SQLite:

```typescript
// src/db/sqlite/seed.ts or src/db/postgres/seed.ts
export async function seed() {
  try {
    // Seed users
    // ...

    // Seed categories
    // ...

    // Seed products
    // ...

    // Seed testimonials
    // ...

    // Seed features
    // ...

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
```

When adding new tables to the schema, you should also update the seed files to include initial data for those tables. This ensures that all components have data to display during development.
export * from './items';
export * from './products';
export * from './categories';
export * from './features';
export * from './testimonials';
```

Each schema file defines tables with appropriate types for its database. For example, here's how the items table is defined for PostgreSQL:

```typescript
// src/db/postgres/schema/items.ts
import { pgTable, text, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  isTrending: boolean("is_trending").default(false),
  isPopular: boolean("is_popular").default(false),
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  salesCount: integer("sales_count").default(0),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### Service Layer Implementation

The service layer is implemented with environment-specific implementations, allowing seamless switching between database types:

```typescript
// src/services/index.ts
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
```

Each database-specific service implementation includes proper typing and error handling:

```typescript
// src/services/services.postgres.ts (example)
import { items } from '~/db/postgres/schema';
import { postgresDb as db } from "~/db/postgres";
import { eq } from 'drizzle-orm';

// Type definitions
type Item = typeof items.$inferSelect;

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
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(items).values(newItem).execute();
    return itemsService.getById(newItem.id);
  }
};
```
```

### API Route Implementation

API routes are implemented using Next.js App Router API routes, with proper error handling and service layer integration:

```typescript
// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { itemsService } from "~/services";

export async function GET(request: Request) {
  try {
    const data = await itemsService.getAll();
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
    const created = await itemsService.create(body);
    
    if (!created) {
      return NextResponse.json(
        { error: "Failed to create item" },
        { status: 400 }
      );
    }
    
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

This approach ensures that:

1. Business logic is encapsulated in the service layer
2. API routes are thin controllers that delegate to services
3. Error handling is consistent across all endpoints
4. Database-specific implementation details are abstracted away
```

### Frontend Architecture

#### Next.js App Router Structure

The project uses Next.js App Router for routing and rendering, with a clear separation between server and client components:

1. **Server Components**
   - Used for data fetching and initial rendering
   - Located in `src/app` directory with page.tsx and layout.tsx files
   - Directly import services for data access
   - Provide data to client components via props
   - Handle server-side rendering and static generation

2. **Client Components**
   - Used for interactive UI elements
   - Marked with 'use client' directive
   - Located in `src/components` and `src/ui` directories
   - Handle client-side state and user interactions
   - Use React hooks for data fetching and state management

3. **Layouts and Templates**
   - Shared layouts in layout.tsx files
   - Nested layouts for section-specific UI
   - Loading states with loading.tsx
   - Error handling with error.tsx
   - Not-found handling with not-found.tsx

#### UI Component Organization

UI components are organized in a hierarchical structure:

1. **Primitives** (`src/ui/primitives`)
   - Basic UI building blocks
   - Highly reusable and composable
   - Minimal business logic
   - Examples: Button, Input, Card, etc.

2. **Compound Components** (`src/ui/components`)
   - Composed of multiple primitives
   - Encapsulate specific UI patterns
   - May contain limited business logic
   - Examples: ProductCard, SearchBar, etc.

3. **Feature Components** (`src/components`)
   - Business-specific components
   - Integrate with services and state
   - Implement specific features
   - Examples: ProductList, ShoppingCart, etc.

4. **Page Components** (`src/app/**/page.tsx`)
   - Top-level components for routes
   - Compose feature components
   - Handle data fetching and layout
   - Implement page-specific logic

### State Management

The project uses a combination of state management approaches:

1. **Local Component State**
   - React's useState and useReducer hooks
   - Used for component-specific state
   - Isolated to individual components
   - Examples: form state, UI toggles, etc.

2. **Server State**
   - Data fetched from API endpoints
   - Managed with React Query or SWR
   - Handles caching, refetching, and synchronization
   - Examples: product data, user profile, etc.

3. **Global State**
   - Used sparingly for truly global concerns
   - Implemented with React Context or Zustand
   - Examples: authentication state, theme preferences, etc.

4. **URL State**
   - State derived from URL parameters
   - Used for shareable and bookmarkable state
   - Examples: search filters, pagination, etc.

### Data Flow Architecture

The project follows a clear data flow pattern:

1. **Data Sources**
   - Database (PostgreSQL or SQLite)
   - External APIs
   - Local storage
   - URL parameters

2. **Data Access Layer**
   - Database clients (Drizzle ORM)
   - API clients for external services
   - Storage utilities for local data

3. **Service Layer**
   - Business logic implementation
   - Database operations abstraction
   - Error handling and validation
   - Type-safe interfaces

4. **API Routes**
   - RESTful endpoints for data access
   - Authentication and authorization
   - Request validation
   - Response formatting

5. **UI Components**
   - Data fetching with React Query/SWR
   - State management with React hooks
   - User interaction handling
   - UI rendering and updates

### Important Notes

1. **Database Operations**
   - All database operations are asynchronous
   - Database-specific implementations are isolated in separate files
   - Use proper typing with `$inferSelect` for type safety
   - Always handle the case where no results are found
   - Use transactions for operations that modify multiple tables

2. **Environment Handling**
   - Use `NEXT_PUBLIC_DATABASE_ENV` to determine database type
   - Default to SQLite if environment variable is not set
   - Use connection pooling for PostgreSQL in development
   - Cache database connections for HMR compatibility
   - Use appropriate schema based on environment

3. **Service Layer Implementation**
   - Implement database-specific services in separate files
   - Export unified service interfaces through index.ts
   - Use consistent method signatures across implementations
   - Handle database-specific error types appropriately
   - Provide comprehensive error logging

4. **Type Safety**
   - Use `$inferSelect` from table definitions for type inference
   - Handle nullable fields with proper type guards
   - Use consistent type annotations across services
   - Avoid type assertions except when necessary
   - Ensure schema exports maintain type safety

5. **Best Practices**
   - Log errors with proper context and stack traces
   - Validate input data before database operations
   - Keep services focused and modular
   - Use proper error responses in API routes
   - Implement proper pagination for list endpoints
   - Use query parameters for filtering and sorting

6. **Testing Considerations**
   - Use a dedicated test database for integration tests
   - Mock database operations in unit tests
   - Test error cases and edge conditions thoroughly
   - Clean up test data after each test run
   - Use proper typing in test files
   - Test both SQLite and PostgreSQL implementations

7. **Performance Optimization**
   - Use React.memo for expensive components
   - Implement virtualization for long lists
   - Optimize database queries with proper indexes
   - Use edge caching for static content
   - Implement incremental static regeneration where appropriate
   - Minimize client-side JavaScript with server components

## Server and Client Component Interaction

在Next.js App Router架构中，正确处理服务器组件和客户端组件之间的交互对于构建高性能、可维护的应用至关重要。本节将详细介绍如何实现服务器组件获取数据并传递给客户端组件的模式，以及何时应该使用这种模式。

### 服务器组件和客户端组件交互的最佳实践

#### 1. 数据获取与传递模式

服务器组件应负责数据获取，然后将数据作为props传递给客户端组件。这种模式有以下优势：

- 减少客户端JavaScript包大小
- 避免客户端发起额外的API请求
- 提高首次加载性能
- 改善SEO
- 保持代码分离和关注点分离

**示例实现：**

```typescript
// src/app/courses/page.tsx (服务器组件)
import { Suspense } from "react";
import { coursesService, categoriesService } from "~/services/";
import { CourseListPage } from "~/ui/components/CourseListPage";
import { Header } from "~/ui/components/header";
import { Footer } from "~/ui/components/footer";
import { LoadingSpinner } from "~/ui/components/LoadingSpinner";

// 从服务器获取所有课程
async function getCourses() {
  try {
    const courses = await coursesService.getAll();
    
    // 处理数据
    return courses.map(course => ({
      ...course,
      features: course.features ? JSON.parse(course.features as string) : [],
      specs: course.specs ? JSON.parse(course.specs as string) : {}
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// 获取所有课程分类
async function getCourseCategories() {
  try {
    const categories = await categoriesService.getAll();
    return ["All", ...categories.map(category => category.name)];
  } catch (error) {
    console.error("Error fetching course categories:", error);
    return ["All"];
  }
}

export default async function CoursesPage() {
  // 在服务器组件中获取数据
  const courses = await getCourses();
  const categories = await getCourseCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Suspense fallback={<LoadingSpinner />}>
          {/* 将数据作为props传递给客户端组件 */}
          <CourseListPage 
            initialCourses={courses} 
            categories={categories}
            title="课程列表"
            description="浏览我们精选的在线课程，提升您的技能和知识"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

```typescript
// src/ui/components/CourseListPage.tsx (客户端组件)
"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "./CourseCard";
import { CategoryFilter } from "./CategoryFilter";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  specs: Record<string, any>;
  // 其他属性...
}

interface CourseListPageProps {
  initialCourses: Course[];
  categories: string[];
  title: string;
  description: string;
}

export function CourseListPage({ 
  initialCourses, 
  categories, 
  title, 
  description 
}: CourseListPageProps) {
  // 客户端状态管理
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 客户端过滤逻辑
  useEffect(() => {
    if (selectedCategory === "All" && searchTerm === "") {
      setCourses(initialCourses);
      return;
    }
    
    const filtered = initialCourses.filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = searchTerm === "" || 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setCourses(filtered);
  }, [selectedCategory, searchTerm, initialCourses]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="relative">
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">没有找到匹配的课程</p>
        </div>
      )}
    </div>
  );
}
```

#### 2. 何时使用服务器组件获取数据并传递给客户端组件

以下情况适合使用服务器组件获取数据并传递给客户端组件：

- **需要SEO优化的页面**：搜索引擎可以直接看到服务器渲染的内容
- **数据需要直接访问数据库或后端服务**：避免暴露敏感的API端点或凭证
- **初始页面加载性能至关重要**：减少客户端JavaScript包大小和网络请求
- **页面包含大量静态内容和少量交互元素**：大部分内容可以在服务器上渲染
- **需要进行复杂数据处理**：在服务器上处理数据可以减轻客户端负担

#### 3. 何时使用API路由更合适

以下情况可能更适合使用API路由：

- **需要实时数据更新**：客户端需要定期刷新数据或使用WebSocket
- **用户特定的数据操作**：基于用户操作需要获取不同的数据
- **分页、排序和复杂过滤**：当这些操作需要从服务器获取新数据而不是在客户端过滤
- **表单提交和数据修改**：需要向服务器发送数据并获取响应
- **认证和授权**：需要在每个请求中验证用户身份和权限

#### 4. 混合方法：初始数据 + API路由更新

在许多情况下，最佳方法是结合使用两种模式：

1. 使用服务器组件获取并传递初始数据
2. 使用API路由处理后续数据更新和用户交互

```typescript
// 混合方法示例
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataListProps {
  initialData: any[];
}

export function DataList({ initialData }: DataListProps) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 处理分页或其他需要新数据的操作
  async function loadMoreData() {
    const nextPage = page + 1;
    const response = await fetch(`/api/data?page=${nextPage}`);
    const newData = await response.json();
    
    setData([...data, ...newData]);
    setPage(nextPage);
    
    // 更新URL以支持共享和书签
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      {/* 显示数据 */}
      <div className="grid grid-cols-3 gap-4">
        {data.map(item => (
          <div key={item.id} className="border p-4 rounded">
            {item.name}
          </div>
        ))}
      </div>
      
      {/* 加载更多按钮 */}
      <button 
        onClick={loadMoreData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        加载更多
      </button>
    </div>
  );
}
```

### 实际案例：重构courses/page.tsx

以下是将courses/page.tsx重构为服务器组件获取数据并传递给客户端组件CourseListPage的完整示例：

#### 重构前（假设是客户端组件获取数据）：

```typescript
// 重构前：客户端组件自己获取数据
"use client";

import { useState, useEffect } from "react";
import { Header } from "~/ui/components/header";
import { Footer } from "~/ui/components/footer";
import { CourseCard } from "~/ui/components/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 客户端获取数据
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // 获取课程数据
        const coursesResponse = await fetch("/api/courses");
        const coursesData = await coursesResponse.json();
        
        // 获取分类数据
        const categoriesResponse = await fetch("/api/categories");
        const categoriesData = await categoriesResponse.json();
        
        setCourses(coursesData);
        setCategories(["All", ...categoriesData.map(c => c.name)]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // 其余组件逻辑...
}
```

#### 重构后（服务器组件获取数据并传递给客户端组件）：

```typescript
// src/app/courses/page.tsx (服务器组件)
import { Suspense } from "react";
import { coursesService, categoriesService } from "~/services/";
import { CourseListPage } from "~/ui/components/CourseListPage";
import { Header } from "~/ui/components/header";
import { Footer } from "~/ui/components/footer";
import { LoadingSpinner } from "~/ui/components/LoadingSpinner";

// 从服务器获取所有课程
async function getCourses() {
  try {
    const courses = await coursesService.getAll();
    
    // 处理数据
    return courses.map(course => ({
      ...course,
      features: course.features ? JSON.parse(course.features as string) : [],
      specs: course.specs ? JSON.parse(course.specs as string) : {}
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// 获取所有课程分类
async function getCourseCategories() {
  try {
    const categories = await categoriesService.getAll();
    return ["All", ...categories.map(category => category.name)];
  } catch (error) {
    console.error("Error fetching course categories:", error);
    return ["All"];
  }
}

export default async function CoursesPage() {
  // 在服务器组件中获取数据
  const courses = await getCourses();
  const categories = await getCourseCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Suspense fallback={<LoadingSpinner />}>
          {/* 将数据作为props传递给客户端组件 */}
          <CourseListPage 
            initialCourses={courses} 
            categories={categories}
            title="课程列表"
            description="浏览我们精选的在线课程，提升您的技能和知识"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

```typescript
// src/ui/components/CourseListPage.tsx (客户端组件)
"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "./CourseCard";
import { CategoryFilter } from "./CategoryFilter";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  specs: Record<string, any>;
  // 其他属性...
}

interface CourseListPageProps {
  initialCourses: Course[];
  categories: string[];
  title: string;
  description: string;
}

export function CourseListPage({ 
  initialCourses, 
  categories, 
  title, 
  description 
}: CourseListPageProps) {
  // 客户端状态管理
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 客户端过滤逻辑
  useEffect(() => {
    if (selectedCategory === "All" && searchTerm === "") {
      setCourses(initialCourses);
      return;
    }
    
    const filtered = initialCourses.filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = searchTerm === "" || 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setCourses(filtered);
  }, [selectedCategory, searchTerm, initialCourses]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="relative">
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">没有找到匹配的课程</p>
        </div>
      )}
    </div>
  );
}
```

### 重构的优势

1. **性能提升**：
   - 减少了客户端JavaScript包大小
   - 消除了客户端的数据获取请求
   - 加快了首次内容绘制(FCP)和首次可交互时间(TTI)

2. **用户体验改善**：
   - 页面加载时已有完整数据，无需显示加载状态
   - 减少了布局偏移(CLS)
   - 即使在JavaScript禁用的环境中也能显示内容

3. **开发体验优化**：
   - 关注点分离更清晰
   - 服务器组件处理数据获取，客户端组件处理交互
   - 错误处理更集中
   - 类型安全从服务器到客户端

4. **SEO改善**：
   - 搜索引擎可以直接抓取完整内容
   - 元数据可以动态生成

5. **安全性提升**：
   - 敏感操作保留在服务器端
   - 无需暴露额外的API端点

通过这种模式，我们可以充分利用Next.js App Router架构的优势，在保持服务器组件数据获取能力的同时，利用客户端组件的交互能力，创建高性能、可维护的应用。

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

### 2. Server vs Client Components

#### Important: Default to Server Components

In Next.js App Router, **pages are Server Components by default**. You should maintain this default whenever possible and avoid unnecessarily converting pages to Client Components.

**Server Components Benefits:**
- Improved performance (smaller bundle size, no JS shipped to client)
- Direct access to backend resources (database, services)
- Better SEO (faster initial load, better indexing)
- Automatic code splitting
- Security (sensitive code never reaches the client)

**When to use Server Components (default):**
- Pages that primarily display data
- SEO-critical pages
- Pages with minimal interactivity
- Pages that need direct access to backend resources

**When to use Client Components (add "use client" directive):**
- Components that use React hooks (useState, useEffect, etc.)
- Components that need browser APIs
- Components with event listeners
- Components that use custom hooks
- Components that use React Context

#### Mixing Server and Client Components

The recommended pattern is to keep pages as Server Components and only convert specific interactive components to Client Components:

```
// Server Component (page.tsx)
|
├── ServerComponent1
├── ServerComponent2
└── ClientComponent ("use client") 
    ├── ClientSubComponent1
    └── ClientSubComponent2
```

### 3. Basic Page Structure (Server Component)

```typescript
// src/app/your-page/page.tsx
// No "use client" directive - this is a Server Component

import { Header } from "~/ui/components/header";
import { YourComponent } from "~/ui/components/your-component";
import { getDataFromService } from "~/services/your-service";

export default async function YourPage() {
  // Data fetching directly in Server Component
  const data = await getDataFromService();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          {/* Pass data to components */}
          <YourComponent data={data} />
        </div>
      </main>
    </div>
  );
}
```

### 4. Client Component Example (Only When Needed)

```typescript
// src/ui/components/your-interactive-component.tsx
"use client";

import { useState } from "react";

interface InteractiveComponentProps {
  initialData: any;
}

export function InteractiveComponent({ initialData }: InteractiveComponentProps) {
  const [data, setData] = useState(initialData);
  
  // Client-side interactivity
  const handleClick = () => {
    setData({ ...data, clicked: true });
  };
  
  return (
    <div>
      <button onClick={handleClick}>Update State</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
```

### 5. Add Navigation
Update the navigation component to include the new page:
```typescript
// src/ui/components/header.tsx
<Link href="/your-page">Your Page</Link>
```

### 6. Best Practices for Component Type Selection

#### Anti-Patterns to Avoid

1. **Don't convert entire pages to Client Components unnecessarily**
   ```typescript
   // ❌ BAD: Converting the entire page to a Client Component
   "use client";
   
   export default function Page() {
     // Only one small part needs interactivity
     return <div>...</div>;
   }
   ```
   
   ```typescript
   // ✅ GOOD: Keep the page as a Server Component and isolate client code
   // page.tsx (Server Component)
   import { InteractiveWidget } from "~/components/interactive-widget";
   
   export default function Page() {
     return (
       <div>
         <h1>My Page</h1>
         <InteractiveWidget /> {/* This is a Client Component */}
       </div>
     );
   }
   ```

2. **Don't fetch data in Client Components when it can be done in Server Components**
   ```typescript
   // ❌ BAD: Fetching data in a Client Component
   "use client";
   
   import { useEffect, useState } from "react";
   
   export default function Page() {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       fetch('/api/data')
         .then(res => res.json())
         .then(data => setData(data));
     }, []);
     
     return <div>{data ? <DisplayData data={data} /> : <Loading />}</div>;
   }
   ```
   
   ```typescript
   // ✅ GOOD: Fetch data in the Server Component
   // page.tsx (Server Component)
   import { getData } from "~/services/data-service";
   import { DisplayData } from "~/components/display-data";
   
   export default async function Page() {
     const data = await getData();
     
     return <DisplayData data={data} />;
   }
   ```

3. **Don't modify existing Server Components to Client Components during feature additions**
   ```typescript
   // ❌ BAD: Converting an existing Server Component to a Client Component
   // Before: page.tsx (Server Component)
   // After adding a feature:
   "use client";
   
   export default function Page() {
     // Added a small interactive feature and converted the whole page
     return <div>...</div>;
   }
   ```
   
   ```typescript
   // ✅ GOOD: Extract the interactive part to a separate Client Component
   // page.tsx (remains a Server Component)
   import { NewFeature } from "~/components/new-feature";
   
   export default function Page() {
     return (
       <div>
         <h1>Existing Content</h1>
         <NewFeature /> {/* New interactive feature as a Client Component */}
       </div>
     );
   }
   ```

#### Data Flow Between Server and Client Components

1. **Pass data from Server to Client Components as props**
   ```typescript
   // Server Component
   import { ClientComponent } from "~/components/client-component";
   
   export default async function Page() {
     const data = await fetchData();
     
     return <ClientComponent initialData={data} />;
   }
   ```

2. **Use Server Actions for form submissions and data mutations**
   ```typescript
   // Server action in a separate file
   'use server';
   
   export async function submitForm(formData: FormData) {
     // Process form data on the server
     // Update database
     return { success: true };
   }
   ```
   
   ```typescript
   // Client Component using server action
   'use client';
   
   import { submitForm } from "~/actions/form-actions";
   
   export function FormComponent() {
     return (
       <form action={submitForm}>
         {/* Form fields */}
         <button type="submit">Submit</button>
       </form>
     );
   }
   ```

#### Performance Optimization with Server Components

1. **Streaming and Suspense**
   ```typescript
   // page.tsx (Server Component)
   import { Suspense } from "react";
   import { SlowDataComponent } from "~/components/slow-data";
   
   export default function Page() {
     return (
       <div>
         <h1>Instant Header</h1>
         <Suspense fallback={<div>Loading...</div>}>
           <SlowDataComponent /> {/* This component can stream in later */}
         </Suspense>
       </div>
     );
   }
   ```

2. **Parallel Data Fetching**
   ```typescript
   // page.tsx (Server Component)
   export default async function Page() {
     // Start both requests in parallel
     const productsPromise = getProducts();
     const categoriesPromise = getCategories();
     
     // Wait for both to complete
     const [products, categories] = await Promise.all([
       productsPromise,
       categoriesPromise
     ]);
     
     return (
       <div>
         <ProductList products={products} />
         <CategoryFilter categories={categories} />
       </div>
     );
   }
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
