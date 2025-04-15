import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: ".env.local" });

export default defineConfig({
	schema: "./src/db/schema",
	out: "./supabase/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
