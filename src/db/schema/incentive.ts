import {
  pgTable,
  serial,
  text,
  varchar,
  time,
  integer,
} from "drizzle-orm/pg-core";
import { timestamps } from "./commmon";
import { teachers } from "./teacher";

export const incentives = pgTable("incentive", {
  id: serial().primaryKey(),
  add: integer().notNull(),
  ...timestamps,
});
