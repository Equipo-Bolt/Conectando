import { prisma } from "@/lib/prisma";
import { Division } from "@/types/Division";

/**
 * * getDivisionById() gets a division by its id
 * 
 * @param divisionId<number> id of the division to search
 * @returns Promise of type {@link Division}
 */

export async function getDivisionById(divisionId : number) {
    try {
        const division = await prisma.division.findUnique({
            where: { id : divisionId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!division) {
            throw new Error ("La División no existe");
        }

        return {
            ...division,
            createdAt: division.createdAt.toISOString()
        } as Division;
    } catch(error) {
        console.error(`Error fetching division: ${(error as Error).message}`);
        return ({} as Division);
    }
}