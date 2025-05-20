import { prisma } from "@/lib/prisma";
import { Objective } from "@/types/Objective";

export async function getObjectiveById(objectiveId : number) {
    try {
        const objective = await prisma.objective.findUnique({
            where: { id : objectiveId },
            include: { comments : true}
        })

        if (!objective) {
            return ({} as Objective);
        }

        return objective as Objective;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}