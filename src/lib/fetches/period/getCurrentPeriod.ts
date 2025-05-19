import { prisma } from "@/lib/prisma";
import { Period } from "@/types/Period";

export async function getCurrentPeriod() {
    try {
        const period = await prisma.period.findFirst({
            where: { deactived : false, isCurrent: true }
        });

        if (!period) {
            return ({} as Period)
        }

        return period as Period;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}