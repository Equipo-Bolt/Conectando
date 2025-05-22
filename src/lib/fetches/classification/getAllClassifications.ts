import { prisma } from "@/lib/prisma";
import { Classification } from "@/types/Classification";

/**
 * * getAllClassifications() gets all created and not deactivated classifications
 *
 * @returns Promise of type {@link Classification}[]
 */

export async function getAllClassifications() {
    try {
        const classifications = await prisma.classification.findMany({
            where: { deactived : false }
        });

        if (classifications.length === 0) {
            throw new Error ("No hay clasificaciones")
        }

        return classifications.map(({ deactived, updatedAt, ...c }) => ({
            ...c,
            createdAt: c.createdAt.toISOString()
        })) as Classification[];
    } catch(error) {
        console.error(`Error fetching classifications: ${(error as Error).message}`);
        return ([] as Classification[]);
    }
}