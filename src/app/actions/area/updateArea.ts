import { prisma } from '@/lib/prisma';

export async function updateAreaAction(areaId : number, data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (newTitle === "" || newTitle === null) {
        throw new Error("No title given to area")
    }

    const areaExists = await prisma.area.findUnique({
        where: {
            title: newTitle
        }
    });

    if (areaExists) {
        throw new Error("Area with the given title already exists");
    }

    try {
        await prisma.area.update({
            where: { id : areaId },
            data: { title: newTitle }
        })

        return "Area title has been updated"
    } catch (error) {
        throw new Error ("Failed to update area")
    }
}