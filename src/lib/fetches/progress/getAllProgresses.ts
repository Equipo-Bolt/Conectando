import { prisma } from "@/lib/prisma";
import { Progress } from "@/types/Progress";

/**
 * * getAllProgresses() gets all created and not deactivated progresses
 *
 * @returns Promise of type {@link Progress}[]
 */

export async function getAllProgresses() {
    try {
        const progresses = await prisma.progress.findMany({
            where: { deactived : false }
        });

        if (progresses.length === 0) {
            throw new Error ("No hay Progresos");
        }

        return progresses.map(({ deactived, updatedAt, ...p }) => ({
            ...p,
            createdAt: p.createdAt.toISOString()
        })) as Progress[];
    } catch(error) {
        console.error(`Error fetching periods: ${(error as Error).message}`);
        return ([] as Progress[]);
    }
}