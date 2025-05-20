import { prisma } from "@/lib/prisma";
import { Division } from "@/types/Division";

export async function getBusinessUnitById(businessUnitId : number) {
    try {
        const businessUnit = await prisma.businessUnit.findUnique({
            where: { id : businessUnitId },
            select: {
                id: true,
                title: true,
                createdAt: true,
                division: true
            }
        })

        if (!businessUnit) {
            throw new Error ("Business Unit does not exist");
        }

        return {
            ...businessUnit,
            createdAt: businessUnit.createdAt.toISOString(),
            division: businessUnit.division.title
        } as Division;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}