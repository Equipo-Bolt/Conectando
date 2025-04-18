import { prisma } from "@/lib/prisma";

export async function getAllBusinessUnits() {
    try {
        const businessUnits = await prisma.businessUnit.findMany({
            where: { deactived : false }
        });

        if (businessUnits.length === 0) {
            throw new Error ("There are no business units")
        }

        return businessUnits.map(({ deactived, updatedAt, ...bu }) => ({
            ...bu,
            createdAt: bu.createdAt.toISOString()
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}