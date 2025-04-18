import { prisma } from "@/lib/prisma";

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
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}