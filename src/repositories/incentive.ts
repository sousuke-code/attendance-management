import { db } from "../../db";
import { incentives } from "@/db/schema/incentive";

export async function getIncentives() {
    return db.select().from(incentives);    
}
