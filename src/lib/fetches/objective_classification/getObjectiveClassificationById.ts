import { prisma } from "@/lib/prisma";
import { ObjectiveClassification } from "@/types/ObjectiveClassification";

export async function getObjectiveClassificationById(objectiveClassificationId : number) {
    try {
        const objectiveClassification = await prisma.objectiveClassification.findUnique({
            where: { id : objectiveClassificationId },
            include: { 
              classificationTitle : true
           }
        })

        if (!objectiveClassification) {
            return ({} as ObjectiveClassification);
        }

        return {
            ...objectiveClassification,
            classificationTitle: objectiveClassification.classificationTitle.title
        } as ObjectiveClassification;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}