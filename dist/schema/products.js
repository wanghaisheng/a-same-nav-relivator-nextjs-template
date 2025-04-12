"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.products = (0, sqlite_core_1.sqliteTable)("products", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    name: (0, sqlite_core_1.text)("name").notNull(),
    price: (0, sqlite_core_1.real)("price").notNull(),
    originalPrice: (0, sqlite_core_1.real)("originalPrice"),
    image: (0, sqlite_core_1.text)("image").notNull(),
    category: (0, sqlite_core_1.text)("category").notNull(),
    rating: (0, sqlite_core_1.real)("rating"),
    inStock: (0, sqlite_core_1.integer)("inStock", { mode: "boolean" }).default(true),
    description: (0, sqlite_core_1.text)("description"),
    features: (0, sqlite_core_1.text)("features"),
    specs: (0, sqlite_core_1.text)("specs"),
    createdAt: (0, sqlite_core_1.integer)("createdAt").$defaultFn(function () { return Date.now(); }),
    updatedAt: (0, sqlite_core_1.integer)("updatedAt").$defaultFn(function () { return Date.now(); }),
});
