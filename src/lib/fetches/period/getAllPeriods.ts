import { prisma } from "@/lib/prisma";
import { Period } from "@/types/Period";

/**
 * * getAllPeriods() gets all created and not deactivated periods
 *
 * @returns Promise of type {@link Period}[]
 */

export async function getAllPeriods() {
    try {
        const periods = await prisma.period.findMany({
            where: { deactivated : false }
        });

        if (periods.length === 0) {
            throw new Error ("No hay Periodos")
        }

        return periods as Period[];
    } catch(error) {
        console.error(`Error fetching periods: ${(error as Error).message}`);
        return ([] as Period[]);
    }
}