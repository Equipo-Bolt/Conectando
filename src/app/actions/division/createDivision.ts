import { prisma } from '@/lib/prisma';

export async function createDivisionAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new division");
    }

    try {
        const divisionsExists = await prisma.division.findUnique({
            where: { 
                title : newTitle 
            }
        });
    
        if (divisionsExists) {
            throw new Error ("Division with same title already exists");
        }

        await prisma.division.create({
            data: {
                title: newTitle
            }
        });

        return "Division created";
    } catch {
        throw new Error ("Failed to create division")
    }
}