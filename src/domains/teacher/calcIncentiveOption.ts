
import { db } from "../../../db";
import { incentives } from "@/db/schema/incentive";
import { getIncentives } from "@/repositories/incentive";

export default async function calcIncentiveOption(point: number) {
    const incentives = await getIncentives();
    const availableIncentives = incentives.filter((incentive) => incentive.requiredPonits <= point);
    return availableIncentives;
}
