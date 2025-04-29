import { prisma } from "@/lib/prisma";
import { TypeArea } from "@/types/TypeArea";

export async function getAllAreas() {
    try {
        const areas = await prisma.area.findMany({
            where: { deactived : false }
        });

        if (areas.length === 0) {
            throw new Error ("There are no areas")
        }

        //! Since we use Date type, we must convert to string
        return areas.map(({ deactived, updatedAt, ...a }) => ({ //! will be omiting updatedAt and deactived
            ...a,
            createdAt: a.createdAt.toISOString() //* into ISO format
        })) as TypeArea[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}