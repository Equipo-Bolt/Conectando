import { prisma } from "@/lib/prisma";
import { TypeDivision } from "@/types/TypeDivision";

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
        } as TypeDivision;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}