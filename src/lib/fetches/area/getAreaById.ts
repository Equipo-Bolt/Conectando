import { prisma } from "@/lib/prisma";

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
        };
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}