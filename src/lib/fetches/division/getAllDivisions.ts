import { prisma } from "@/lib/prisma";
import { TypeDivision } from "@/types/TypeDivision";

export async function getAllDivisions() {
    try {
        const divisions = await prisma.division.findMany({
            where: { deactived : false }
        });

        if (divisions.length === 0) {
            throw new Error ("There are no divisions")
        }

        return divisions.map(({ deactived, updatedAt, ...d }) => ({
            ...d,
            createdAt: d.createdAt.toISOString()
        })) as TypeDivision[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}