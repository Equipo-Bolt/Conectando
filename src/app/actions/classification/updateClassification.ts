import { prisma } from '@/lib/prisma';

export async function updateClassificationAction(classificationId : number, data : FormData) {
    if (!classificationId){
        throw new Error ("No id given to disable classification");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to classification");
    }

    const classificationsExists = await prisma.classification.findUnique({
        where: { title : newTitle }
    })

    if (classificationsExists) {
        throw new Error ("Classification with same data already exists")
    }

    try {
        await prisma.classification.update({
            where: { id : classificationId },
            data: { title: newTitle }
        })

        return "Classification has been updated";
    } catch (error) {
        throw new Error ("Failed to update Classification")
    }
}