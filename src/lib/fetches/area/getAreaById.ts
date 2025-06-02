import { prisma } from "@/lib/prisma";
import { Area } from "@/types/Area";

/**
 * * getAreaById() gets an area by its id
 * 
 * @param areaId<number> id of the area to search
 * @returns Promise of type {@link Area}
 */

export async function getAreaById(areaId : number) {
    try {
        const area = await prisma.area.findUnique({
            where: { id : areaId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!area) {
            throw new Error ("El Area no existe")
        }

        return {
            ...area,
            createdAt: area.createdAt.toISOString()
        } as Area;
    } catch(error) {
        console.error(`Error fetching area: ${(error as Error).message}`);
        return ({} as Area);
    }
}