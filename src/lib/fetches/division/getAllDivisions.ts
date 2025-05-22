import { prisma } from "@/lib/prisma";
import { Division } from "@/types/Division";

/**
 * * getAllDivisions() gets all created and not deactivated divisions
 *
 * @returns Promise of type {@link Division}[]
 */

export async function getAllDivisions() {
    try {
        const divisions = await prisma.division.findMany({
            where: { deactived : false }
        });

        if (divisions.length === 0) {
            throw new Error ("No hay divisiones")
        }

        return divisions.map(({ deactived, updatedAt, ...d }) => ({
            ...d,
            createdAt: d.createdAt.toISOString()
        })) as Division[];
    } catch(error) {
        console.error(`Error fetching divisions: ${(error as Error).message}`);
        return ([] as Division[]);
    }
}