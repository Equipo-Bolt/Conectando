import { prisma } from "@/lib/prisma";
import { ObjectiveClassification } from "@/types/ObjectiveClassification";

/**
 * * getAllObjectiveClassifications() gets all created and not deactivated objective classifications
 *
 * @returns Promise of type {@link ObjectiveClassification}[]
 */

export async function getAllObjectiveClassifications() {
    try {
        const objectiveClassifications = await prisma.objectiveClassification.findMany({
            where: { deactivated : false },
            include: { classificationCatalog : true }
        });

        if (objectiveClassifications.length === 0) {
            throw new Error ("No hay Clasificaciones de Objetivos")
        }

        return objectiveClassifications.map(({ 
            deactivated, 
            updatedAt,
            classificationCatalog,
            ...oc }) => ({ 
                ...oc, 
                classificationTitle: classificationCatalog?.title
            })) as ObjectiveClassification[];
    } catch(error) {
        console.error(`Error fetching objective classifications: ${(error as Error).message}`);
        return ([] as ObjectiveClassification[]);
    }
}