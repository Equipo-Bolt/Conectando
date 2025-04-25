"use server";

import { prisma } from '@/lib/prisma';

export async function updateDivisionAction(divisionId : number, data : FormData) {
    if (!divisionId){
        throw new Error ("No id given to division");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to division");
    }

    try {
        const divisionsExists = await prisma.division.findUnique({
            where: { 
                NOT: {
                    id: divisionId
                },
                title : newTitle 
            }
        });

        if (divisionsExists) {
            throw new Error ("Division with same title already exists");
        }

        await prisma.division.update({
            where: { id : divisionId },
            data: { title: newTitle }
        });

        return "Division has been updated";
    } catch {
        throw new Error ("Failed to update division");
    }
}