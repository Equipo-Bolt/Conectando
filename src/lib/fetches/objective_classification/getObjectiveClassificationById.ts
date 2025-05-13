import { prisma } from "@/lib/prisma";
import { TypeObjectiveClassification } from "@/types/TypeObjectiveClassification";

export async function getObjectiveClassificationById(objectiveClassificationId : number) {
    try {
        const objectiveClassification = await prisma.objectiveClassification.findUnique({
            where: { id : objectiveClassificationId },
            include: { 
                classificationTitle : true
             }
        })

        if (!objectiveClassification) {
            return ({} as TypeObjectiveClassification);
        }

        return {
            ...objectiveClassification,
            classificationTitle: objectiveClassification.classificationTitle.title
        } as TypeObjectiveClassification;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}