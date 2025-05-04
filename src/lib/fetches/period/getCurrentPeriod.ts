import { prisma } from "@/lib/prisma";
import { TypePeriod } from "@/types/TypePeriod";

export async function getCurrentPeriod() {
    try {
        const period = await prisma.period.findFirst({
            where: { deactived : false, isCurrent: true }
        });

        if (!period) {
            return ({} as TypePeriod)
        }

        return period as TypePeriod;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}