"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.categories = (0, sqlite_core_1.sqliteTable)("categories", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    name: (0, sqlite_core_1.text)("name").notNull(),
    image: (0, sqlite_core_1.text)("image").notNull(),
    productCount: (0, sqlite_core_1.integer)("productCount").default(0),
    createdAt: (0, sqlite_core_1.integer)("createdAt").$defaultFn(function () { return Date.now(); }),
    updatedAt: (0, sqlite_core_1.integer)("updatedAt").$defaultFn(function () { return Date.now(); }),
});
