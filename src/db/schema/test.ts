import { pgTable,serial, text } from "drizzle-orm/pg-core";

export const test = pgTable("tests", {
    id: serial().primaryKey(),
    name: text().notNull(),
})
