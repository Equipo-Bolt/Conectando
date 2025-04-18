import { prisma } from "@/lib/prisma";

export async function getPeriodById(periodId : number) {
    try {
        const period = await prisma.period.findUnique({
            where: { id : periodId },
            select: {
                id: true,
                startsAt: true,
                endsAt: true,
                isCurrent: true,
                createdAt: true
            }
        })

        if (!period) {
            throw new Error ("Period does not exist");
        }

        return {
            ...period,
            startsAt: period.startsAt.toISOString(),
            endsAt: period.endsAt.toISOString(),
            createdAt: period.createdAt.toISOString()
        };
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}