"use server";

import { prisma } from '@/lib/prisma';

export async function updateAreaAction(areaId : number, data : FormData) {
    if (!areaId) {
        throw new Error("No id given to area");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to area")
    }

    try {
        const areaExists = await prisma.area.findUnique({
            where: {
                NOT: {
                    id: areaId
                },
                title: newTitle
            }
        });
    
        if (areaExists) {
            throw new Error("Area with same title already exists");
        }

        await prisma.area.update({
            where: { id : areaId },
            data: { title: newTitle }
        })

        return "Area title has been updated";
    } catch {
        throw new Error ("Failed to update area");
    }
}