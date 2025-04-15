import { pgTable,serial, text} from "drizzle-orm/pg-core";
import { timestamps } from "./commmon";

export const admin = pgTable("admin", {
    id: serial().primaryKey(),
    email: text().notNull(),
    name: text().notNull(),
    password: text().notNull(),
    ...timestamps,
})

export const Admins = typeof admin.$inferSelect;