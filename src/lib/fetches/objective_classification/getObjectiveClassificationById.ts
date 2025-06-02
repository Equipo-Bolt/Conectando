import { prisma } from "@/lib/prisma";
import { ObjectiveClassification } from "@/types/ObjectiveClassification";

/**
 * * getObjectiveClassificationById() gets an objective classification by its id
 * 
 * @param objectiveClassificationId<number> id of the objective classification to search
 * @returns Promise of type {@link ObjectiveClassification}
 */

export async function getObjectiveClassificationById(objectiveClassificationId : number) {
    try {
        const objectiveClassification = await prisma.objectiveClassification.findUnique({
            where: { id : objectiveClassificationId },
            include: { 
              classificationCatalog : true
           }
        })

        if (!objectiveClassification) {
            throw new Error("La Clasificación de Objetivos no existe")
        }

        return {
            ...objectiveClassification,
            classificationTitle: objectiveClassification.classificationCatalog.title
        } as ObjectiveClassification;
        } catch(error) {
            console.error(`Error fetching objective classification: ${(error as Error).message}`);
            return ({} as ObjectiveClassification);
    }
}