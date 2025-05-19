import { prisma } from "@/lib/prisma";
import { ObjectiveClassification } from "@/types/ObjectiveClassification";

export async function getAllObjectiveClassifications() {
    try {
        const objectiveClassifications = await prisma.objectiveClassification.findMany({
            where: { deactived : false },
            include: { classificationTitle : true }
        });

        if (objectiveClassifications.length === 0) {
            throw new Error ("There are no Objectives Classifications")
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
        throw new Error(`Error: ${(error as Error).message}`);
    }
}