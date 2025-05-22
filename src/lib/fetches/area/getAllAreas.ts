import { prisma } from "@/lib/prisma";
import { Area } from "@/types/Area";

/**
 * * getAllAreas() gets all created and not deactivated areas
 *
 * @returns Promise of type {@link Area}[]
 */

export async function getAllAreas() {
    try {
        const areas = await prisma.area.findMany({
            where: { deactived : false }
        });

        if (areas.length === 0) {
            throw new Error("No hay Areas")
        };

        //! Since we use Date type, we must convert to string
        return areas.map(({ deactived, updatedAt, ...a }) => ({ //! will be omiting updatedAt and deactived
            ...a,
            createdAt: a.createdAt.toISOString() //* into ISO format
        })) as Area[];
    } catch(error) {
        console.error(`Error fetching areas: ${(error as Error).message}`);
        return ([] as Area[]);
    }
}