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
            where: { deactived : false },
            include: { classificationTitle : true }
        });

        if (objectiveClassifications.length === 0) {
            throw new Error ("No hay Clasificaciones de Objetivos")
        }

        return objectiveClassifications.map(({ 
            deactived, 
            updatedAt,
            classificationTitle,
            ...oc }) => ({ 
                ...oc, 
                classificationTitle: classificationTitle?.title //! Include Classification title
            })) as ObjectiveClassification[];
    } catch(error) {
        console.error(`Error fetching objective classifications: ${(error as Error).message}`);
        return ([] as ObjectiveClassification[]);
    }
}