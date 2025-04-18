import { prisma } from '@/lib/prisma';

export async function createAreaAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (newTitle === "" || newTitle === null) {
        throw new Error("No title given to new area")
    }

    try {
        await prisma.area.create({
            data: {
                title: newTitle
            }
        })

        return "Area created";
    } catch (error) {
        throw new Error ("Failed to create area")
    }
}