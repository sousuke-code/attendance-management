import { config } from "dotenv";
import { drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local"});

const dbUrl = process.env.NEXT_PUBLIC_DB_URL;
if (!dbUrl) {
  throw new Error("Database URL is not defined");
}
export const db = drizzle(dbUrl);
