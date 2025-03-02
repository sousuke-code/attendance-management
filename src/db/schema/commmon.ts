import {  timestamp, varchar } from "drizzle-orm/pg-core";


export const timestamps = {
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }),
};
