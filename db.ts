import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".env" });

const dbUrl = process.env.DATABASE_URL;
console.log("Database URL:", dbUrl);
if (!dbUrl) {
  throw new Error("Failed to connect to database: DATABASE_URL is not defined");
}
export const db = drizzle(dbUrl);

export type DB = Pick< 
  typeof db,
  "query" | "select" | "insert" | "update" | "delete" | "transaction"
>;
