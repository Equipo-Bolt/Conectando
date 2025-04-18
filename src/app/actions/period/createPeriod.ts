import { prisma } from '@/lib/prisma';

export async function createPeriodAction(data : FormData) {
    const rawStart = data.get("startsAt") as string | null;
    const rawEnd = data.get("endsAt") as string | null;
    const rawCurrent = data.get("isCurrent") as string | null;

    if (!rawStart) {
        throw new Error("No start date given");
    }

    if (!rawEnd) {
        throw new Error("No end date given");
    }

    const starts = new Date(rawStart);
    const ends = new Date(rawEnd);
    const isCurrent = rawCurrent === "on"; //* assuming we use checkbox since its boolean

    const currentExists = await prisma.period.findFirst({
        where: { isCurrent : true } 
    })

    if (currentExists && isCurrent) {
        throw new Error ("Can't create new current period because there already is one")
    }

    try {
        await prisma.period.create({
            data: {
                startsAt: starts,
                endsAt: ends,
                isCurrent: isCurrent
            }
        })

        return "Period created";
    } catch (error) {
        throw new Error ("Failed to create period")
    }
}