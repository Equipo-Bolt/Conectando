import { prisma } from "@/lib/prisma";
import { TypeObjective } from "@/types/TypeObjective";

export async function getAllObjectives() {
    try {
        const objectives = await prisma.objective.findMany({
            where: { deactived : false }
        });

        if (objectives.length === 0) {
            throw new Error ("There are no Objectives")
        }

        return objectives.map(({ deactived, updatedAt, ...o }) => o) as TypeObjective[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}