import { prisma } from "@/lib/prisma";
import { TypePeriod } from "@/types/TypePeriod";

export async function getCurrentPeriod() {
    try {
        const period = await prisma.period.findFirst({
            where: { deactived : false, isCurrent: true }
        });

        if (!period) {
            throw new Error ("There are no current periods")
        }

        return period as TypePeriod;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}