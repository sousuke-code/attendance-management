"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var dotenv_1 = require("dotenv");
var postgres_js_1 = require("drizzle-orm/postgres-js");
(0, dotenv_1.config)({ path: ".env.local" });
var dbUrl = process.env.NEXT_PUBLIC_DB_URL;
if (!dbUrl) {
    throw new Error("Database URL is not defined");
}
exports.db = (0, postgres_js_1.drizzle)(dbUrl);
