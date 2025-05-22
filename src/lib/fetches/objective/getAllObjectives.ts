import { prisma } from "@/lib/prisma";
import { Objective } from "@/types/Objective";

/**
 * * getAllObjectives() gets all created and not deactivated objectives
 *
 * @returns Promise of type {@link Objective}[]
 */

export async function getAllObjectives() {
    try {
        const objectives = await prisma.objective.findMany({
            where: { deactived : false }
        });

        if (objectives.length === 0) {
            throw new Error ("No hay Objetivos")
        }

        return objectives.map(({ deactived, updatedAt, ...o }) => o) as Objective[];
    } catch(error) {
        console.error(`Error fetching objectives: ${(error as Error).message}`);
        return ([] as Objective[]);
    }
}