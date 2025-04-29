import { prisma } from "@/lib/prisma";

export async function getAllClassifications() {
    try {
        const classifications = await prisma.classification.findMany({
            where: { deactived : false }
        });

        if (classifications.length === 0) {
            throw new Error ("There are no classifications")
        }

        return classifications.map(({ deactived, updatedAt, ...c }) => ({
            ...c,
            createdAt: c.createdAt.toISOString()
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}