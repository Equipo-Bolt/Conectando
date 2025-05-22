import { prisma } from "@/lib/prisma";
import { Period } from "@/types/Period";

/**
 * * getPeriodById() gets a period by its id
 * 
 * @param periodId<number> id of the period to search
 * @returns Promise of type {@link Period}
 */

export async function getPeriodById(periodId : number) {
    try {
        const period = await prisma.period.findUnique({
            where: { id : periodId },
            select: {
                id: true,
                startsAt: true,
                endsAt: true,
                isCurrent: true,
                createdAt: true
            }
        })

        if (!period) {
            throw new Error ("El Periodo no existe");
        }

        return period as Period;
    } catch(error) {
        console.error(`Error fetching period: ${(error as Error).message}`);
        return ({} as Period);
    }
}