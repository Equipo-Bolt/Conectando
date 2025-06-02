import { prisma } from "@/lib/prisma";
import { Classification } from "@/types/Classification";

/**
 * * getClassificationById() gets a classification by its id
 * 
 * @param classificationId<number> id of the classification to search
 * @returns Promise of type {@link Classification}
 */

export async function getClassificationById(classificationId : number) {
    try {
        const classification = await prisma.classification.findUnique({
            where: { id : classificationId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!classification) {
            throw new Error ("La Clasificación no existe");
        }

        return {
            ...classification,
            createdAt: classification.createdAt.toISOString()
        } as Classification;
    } catch(error) {
        console.error(`Error fetching classification: ${(error as Error).message}`);
        return ({} as Classification);
    }
}