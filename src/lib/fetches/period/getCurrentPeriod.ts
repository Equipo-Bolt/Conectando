import { prisma } from "@/lib/prisma";
import { Period } from "@/types/Period";

/**
 * * getCurrentPeriod() gets the current period
 * 
 * @returns Promise of type {@link Period}
 */

export async function getCurrentPeriod() {
    try {
        const period = await prisma.period.findFirst({
            where: { deactived : false, isCurrent: true }
        });

        if (!period) {
            throw new Error("No hay un Periodo actual")
        }

        return period as Period;
    } catch(error) {
        console.error(`Error fetching period: ${(error as Error).message}`);
        return ({} as Period);
    }
}