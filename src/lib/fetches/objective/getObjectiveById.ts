import { prisma } from "@/lib/prisma";
import { Objective } from "@/types/Objective";

/**
 * * getObjectiveById() gets an objective by its id
 * 
 * @param objectiveId<number> id of the objective to search
 * @returns Promise of type {@link Objective}
 */

export async function getObjectiveById(objectiveId : number) {
    try {
        const objective = await prisma.objective.findUnique({
            where: { id : objectiveId },
            include: { comments : true}
        })

        if (!objective) {
            throw new Error("El Objetivo no existe");
        }

        return objective as Objective;
        } catch(error) {
            console.error(`Error fetching objective: ${(error as Error).message}`);
            return ({} as Objective);
    }
}