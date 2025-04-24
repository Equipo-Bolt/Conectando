import { prisma } from '@/lib/prisma';

export async function createAreaAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (newTitle === "" || newTitle === null) {
        throw new Error("No title given to new area");
    }

    try {
        const areaExists = await prisma.area.findUnique({
            where: {
                title: newTitle
            }
        });
    
        if (areaExists) {
            throw new Error("Area with same title already exists");
        }

        await prisma.area.create({
            data: {
                title: newTitle
            }
        })

        return "Area created";
    } catch {
        throw new Error ("Failed to create area");
    }
}