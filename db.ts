import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local" });

const dbUrl = process.env.DATABASE_URL;
console.log("dbUrl:", dbUrl);
if (!dbUrl) {
  throw new Error("Database URL is not defined");
}
export const db = drizzle(dbUrl);

export type DB = Pick< 
  typeof db,
  "query" | "select" | "insert" | "update" | "delete" | "transaction"
>;
