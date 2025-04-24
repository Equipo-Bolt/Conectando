import { prisma } from '@/lib/prisma';

export async function updateClassificationAction(classificationId : number, data : FormData) {
    if (!classificationId){
        throw new Error ("No id given to classification");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to classification");
    }

    try {
        const classificationsExists = await prisma.classification.findUnique({
            where: {
                NOT: {
                    id: classificationId
                },
                title : newTitle
            }
        });
    
        if (classificationsExists) {
            throw new Error ("Classification with same title already exists");
        }

        await prisma.classification.update({
            where: { id : classificationId },
            data: { title: newTitle }
        });

        return "Classification has been updated";
    } catch {
        throw new Error ("Failed to update classification");
    }
}