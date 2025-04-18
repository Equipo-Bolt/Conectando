import { prisma } from "@/lib/prisma";

export async function getAllPeriods() {
    try {
        const periods = await prisma.period.findMany({
            where: { deactived : false }
        });

        if (periods.length === 0) {
            throw new Error ("There are no periods")
        }

        return periods.map(({ deactived, updatedAt, ...p }) => ({
            ...p,
            startsAt: p.startsAt.toISOString(),
            endsAt: p.endsAt.toISOString(),
            createdAt: p.createdAt.toISOString()
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}