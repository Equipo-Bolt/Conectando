import { prisma } from "@/lib/prisma";
import { Area } from "@/types/Area";

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
            throw new Error ("Area does not exist");
        }

        return {
            ...area,
            createdAt: area.createdAt.toISOString()
        } as Area;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}