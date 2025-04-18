import { prisma } from "@/lib/prisma";

export async function getAllProgresses() {
    try {
        const progresses = await prisma.progress.findMany({
            where: { deactived : false }
        });

        if (progresses.length === 0) {
            throw new Error ("There are no progresses")
        }

        return progresses.map(({ deactived, updatedAt, ...p }) => ({
            ...p,
            createdAt: p.createdAt.toISOString()
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}