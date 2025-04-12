"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
var better_sqlite3_2 = require("better-sqlite3");
var schema = require("./schema");
var sqlite = new better_sqlite3_2.default((_a = process.env.SQLITE_DB_PATH) !== null && _a !== void 0 ? _a : "sqlite.db");
exports.db = (0, better_sqlite3_1.drizzle)(sqlite, { schema: schema });
