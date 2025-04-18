import { prisma } from '@/lib/prisma';

export async function createDivisionAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new division");
    }

    try {
        await prisma.division.create({
            data: {
                title: newTitle
            }
        })

        return "Division created";
    } catch (error) {
        throw new Error ("Failed to create division")
    }
}