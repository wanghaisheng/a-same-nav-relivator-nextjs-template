"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
var index_1 = require("./index");
var nanoid_1 = require("nanoid");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, _i, categories_1, category, products, _a, products_1, product, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    // Seed users
                    return [4 /*yield*/, index_1.db.run(/* sql */ "\n      INSERT OR IGNORE INTO users (id, name, email, image)\n      VALUES (?, ?, ?, ?)\n    ", [(0, nanoid_1.nanoid)(), "Admin User", "admin@example.com", "/images/avatars/admin.png"])];
                case 1:
                    // Seed users
                    _b.sent();
                    categories = [
                        { name: "Electronics", image: "/images/categories/electronics.jpg" },
                        { name: "Clothing", image: "/images/categories/clothing.jpg" },
                        { name: "Books", image: "/images/categories/books.jpg" },
                    ];
                    _i = 0, categories_1 = categories;
                    _b.label = 2;
                case 2:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 5];
                    category = categories_1[_i];
                    return [4 /*yield*/, index_1.db.run(/* sql */ "\n        INSERT OR IGNORE INTO categories (id, name, image)\n        VALUES (?, ?, ?)\n      ", [(0, nanoid_1.nanoid)(), category.name, category.image])];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    products = [
                        {
                            name: "Smartphone X",
                            price: 999.99,
                            originalPrice: 1099.99,
                            image: "/images/products/smartphone.jpg",
                            category: "Electronics",
                            rating: 4.5,
                            inStock: true,
                            description: "Latest smartphone with advanced features",
                            features: JSON.stringify(["5G", "128GB Storage", "12MP Camera"]),
                            specs: JSON.stringify({ "Screen": "6.1\"", "Battery": "4000mAh" }),
                        },
                        {
                            name: "Laptop Pro",
                            price: 1499.99,
                            originalPrice: 1699.99,
                            image: "/images/products/laptop.jpg",
                            category: "Electronics",
                            rating: 4.8,
                            inStock: true,
                            description: "Professional laptop for work and play",
                            features: JSON.stringify(["16GB RAM", "512GB SSD", "Backlit Keyboard"]),
                            specs: JSON.stringify({ "Screen": "15.6\"", "Processor": "Intel i7" }),
                        },
                    ];
                    _a = 0, products_1 = products;
                    _b.label = 6;
                case 6:
                    if (!(_a < products_1.length)) return [3 /*break*/, 9];
                    product = products_1[_a];
                    return [4 /*yield*/, index_1.db.run(/* sql */ "\n        INSERT OR IGNORE INTO products (\n          id, name, price, originalPrice, image, category, rating,\n          inStock, description, features, specs\n        )\n        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n      ", [
                            (0, nanoid_1.nanoid)(),
                            product.name,
                            product.price,
                            product.originalPrice,
                            product.image,
                            product.category,
                            product.rating,
                            product.inStock,
                            product.description,
                            product.features,
                            product.specs,
                        ])];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log("SQLite database seeded successfully");
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    console.error("Error seeding SQLite database:", error_1);
                    throw error_1;
                case 11: return [2 /*return*/];
            }
        });
    });
}
