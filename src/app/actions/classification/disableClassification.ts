import { prisma } from '@/lib/prisma';

export async function disableClassificationAction(classificationId : number) {
    if (!classificationId){
        throw new Error ("No id given to disable classification");
    }

    try {
        await prisma.classification.update({
            where: { id : classificationId },
            data: { deactived : true }
        })

        return "Classification has been disabled";
    } catch (error) {
        throw new Error ("Failed to disable classification")
    }
}