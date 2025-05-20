import { prisma } from "@/lib/prisma";
import { Division } from "@/types/Division";

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
            throw new Error ("Division does not exist");
        }

        return {
            ...division,
            createdAt: division.createdAt.toISOString()
        } as Division;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}