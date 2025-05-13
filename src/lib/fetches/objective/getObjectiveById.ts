import { prisma } from "@/lib/prisma";
import { TypeObjective } from "@/types/TypeObjective";

export async function getObjectiveById(objectiveId : number) {
    try {
        const objective = await prisma.objective.findUnique({
            where: { id : objectiveId },
            include: { comments : true}
        })

        if (!objective) {
            throw new Error ("Objective does not exist");
        }

        return objective as TypeObjective;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}