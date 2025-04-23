import { prisma } from "@/lib/prisma";
import { TypeObjectiveClassification } from "@/types/TypeObjectiveClassification";

export async function getObjectiveClassificationById(objectiveClassificationId : number) {
    try {
        const objectiveClassification = await prisma.objectiveClassification.findUnique({
            where: { id : objectiveClassificationId }
        })

        if (!objectiveClassification) {
            throw new Error ("Objective-Classification does not exist");
        }

        return objectiveClassification as TypeObjectiveClassification;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}