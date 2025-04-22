import { prisma } from "@/lib/prisma";
import { TypeArea } from "@/types/TypeArea";

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
        } as TypeArea;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}