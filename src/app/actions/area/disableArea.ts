"use server";

import { prisma } from '@/lib/prisma';

export async function disableAreaAction(areaId : number) {
    if (!areaId) {
        throw new Error ("No id given to disable")
    }

    try {
        await prisma.area.update({
            where: { id : areaId },
            data: { deactived: true }
        });

        return "Area has been disabled";
    } catch {
        throw new Error ("Failed to disable area");
    }
}