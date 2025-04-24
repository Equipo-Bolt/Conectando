"use server";

import { prisma } from '@/lib/prisma';

export async function createPeriodAction(data : FormData) {
    const newStart = data.get("startsAt") as string | null;
    const newEnd = data.get("endsAt") as string | null;
    const newCurrent = data.get("isCurrent") as string | null;

    if (!newStart) {
        throw new Error("No start date given to new period");
    }

    if (!newEnd) {
        throw new Error("No end date given to new period");
    }

    const starts = new Date(newStart);
    const ends = new Date(newEnd);
    const isCurrent = newCurrent === "on"; //* assuming we use checkbox since its boolean

    try {
        const currentExists = await prisma.period.findFirst({
            where: { isCurrent : true } 
        })
    
        if (currentExists && isCurrent) { 
            throw new Error ("Can't create a new period because a current period already exists");
        }

        await prisma.period.create({
            data: {
                startsAt: starts,
                endsAt: ends,
                isCurrent: isCurrent
            }
        });

        return "Period created";
    } catch {
        throw new Error ("Failed to create period");
    }
}