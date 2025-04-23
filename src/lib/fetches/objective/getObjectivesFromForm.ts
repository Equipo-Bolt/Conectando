import { prisma } from "@/lib/prisma";
import { TypeObjective } from "@/types/TypeObjective";

export async function getObjectivesFromForm( formId : number ) {
    try {
        const objectives = await prisma.objective.findMany({
            where: { deactived : false, formID : formId }
        });

        if (objectives.length === 0) {
            throw new Error ("There are no objectives for this objective")
        }

        return objectives.map(({ deactived, updatedAt, ...o }) => ( o )) as TypeObjective[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}