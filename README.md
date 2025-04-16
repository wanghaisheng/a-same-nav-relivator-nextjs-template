# Relivator Next.js eCommerce Template

A robust and efficient foundation for eCommerce projects, optimized for fast development and maximum profitability.

[🚀 Live Demo](https://relivator.com) • [💬 Discord](https://discord.gg/Pb8uKbwpsJ) • [💖 Patreon](https://patreon.com/blefnk) • [📚 Docs](https://docs.reliverse.org/relivator)

## Quick Start

1. Ensure [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en), and [Bun](https://bun.sh) are installed
2. `bun i -g @reliverse/cli`
3. `reliverse cli`
4. Choose _✨ Create a brand new project_
5. Provide/skip details about your project
6. It's ready—enjoy! 😊

## Tech Stack

- **Core:** [Next.js 15.2](https://nextjs.org), [React 19](https://react.dev), [TypeScript 5.8](https://typescriptlang.org)
- **Auth:** [Better Auth](https://better-auth.com)
- **Database:** [Drizzle ORM](https://orm.drizzle.team)
  - SQLite for local development
  - PostgreSQL for production
- **Forms:** [🏗️ TanStack Form](https://tanstack.com/form)
- **Payments:** [🏗️ Polar](https://polar.sh)
- **Quality:** [ESLint](https://eslint.org), [Biome](https://biomejs.dev), [Knip](https://knip.dev)
- **Storage:** [🏗️ Uploadthing](https://uploadthing.com)
- **Styling:** [Tailwind 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)

## Help Project Grow

- _If you found Relivator helpful, please consider:_ Star on [GitHub](https://github.com/blefnk/relivator-nextjs-template);
- Support via [Patreon](https://patreon.com/blefnk), [GitHub Sponsors](https://github.com/sponsors/blefnk), or [PayPal](https://paypal.me/blefony). _Thank you!_

## Notes

- Relivator 1.4.0+ is LLM-ready. Its codebase works seamlessly with AI IDEs like Cursor. It helps even beginners to get started quickly.
- Relivator 1.3.0 was rebranded to Versator, which uses [Clerk](https://clerk.com) for auth and [Stripe](https://stripe.com) for payments. Check out the [demo](https://versator.relivator.com/en), [repo](https://github.com/blefnk/versator), or [docs](https://docs.reliverse.org/versator).

## Commands

| Command         | Description                |
|-----------------|----------------------------|
| `bun dev`       | Start dev server           |
| `bun build`     | Build the project          |
| `bun latest`    | Update dependencies        |
| `bun ui`        | Install shadcn components  |
| `bun db:push`   | Apply db schema changes    |
| `bun db:auth`   | Update users schema file   |
| `bun db:studio` | Open db visual editor      |

## Database Setup

### Environment Configuration

Relivator uses a dual-database approach with environment-based configuration:

1. **Development Environment (SQLite)**
   - File-based database stored in `sqlite.db`
   - Lightweight, no external services required
   - Schema location: `src/db/sqlite/schema/*`
   - Set `NEXT_PUBLIC_DATABASE_ENV=sqlite` in `.env.development`

2. **Production Environment (PostgreSQL)**
   - Connection via `postgres-js` with connection pooling
   - Schema location: `src/db/postgres/schema/*`
   - Set `NEXT_PUBLIC_DATABASE_ENV=postgres` in `.env.production`
   - Requires `DATABASE_URL` environment variable

#### Switching Environments

To switch between development and production environments:

1. Create appropriate `.env` files:
   - `.env.development` for local development (SQLite)
   - `.env.production` for production deployment (PostgreSQL)

2. Configure environment variables in each file:
   ```bash
   # .env.development
   NEXT_PUBLIC_DATABASE_ENV=sqlite
   SQLITE_DB_PATH=sqlite.db
   
   # .env.production
   NEXT_PUBLIC_DATABASE_ENV=postgres
   DATABASE_URL=postgresql://user:password@host:port/dbname
   ```

3. The application automatically selects the appropriate database implementation based on these environment variables.

### Data Initialization

The database is automatically initialized when the application starts:

1. Tables are created if they don't exist
2. Seed data is populated for essential tables (users, products, categories, testimonials, features)
3. The `<DatabaseInitializer>` component handles this process on the client side

#### Development (SQLite) Initialization
- Uses `better-sqlite3` for database operations
- Initializes tables with SQLite-compatible data types
- Seed data is stored in `src/db/sqlite/seed.ts`
- Database file is created at project root as `sqlite.db`

#### Production (PostgreSQL) Initialization
- Uses `postgres-js` for database operations
- Initializes tables with PostgreSQL-specific data types (e.g., JSONB, TIMESTAMP WITH TIME ZONE)
- Seed data is stored in `src/db/postgres/seed.ts`
- Requires valid `DATABASE_URL` in environment variables

### Migration and Schema Changes

To apply schema changes to your database:

```bash
# For development (SQLite)
bun db:push --config=drizzle-dev.config.ts

# For production (PostgreSQL)
bun db:push --config=drizzle-prod.config.ts
```

To view and manage your database with a visual editor:

```bash
# For development (SQLite)
bun db:studio --config=drizzle-dev.config.ts

# For production (PostgreSQL)
bun db:studio --config=drizzle-prod.config.ts
```

## License

MIT © [blefnk Nazar Kornienko](https://github.com/blefnk)
