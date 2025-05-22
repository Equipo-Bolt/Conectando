import { prisma } from "@/lib/prisma";
import { Progress } from "@/types/Progress";

/**
 * * getProgressById() gets a period by its id
 * 
 * @param progressId<number> id of the progress to search
 * @returns Promise of type {@link Progress}
 */

export async function getProgressById(progressId : number) {
    try {
        const progress = await prisma.progress.findUnique({
            where: { id : progressId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!progress) {
            throw new Error ("El Progreso no existe");
        }

        return {
            ...progress,
            createdAt: progress.createdAt.toISOString()
        } as Progress;
    } catch(error) {
        console.error(`Error fetching progress: ${(error as Error).message}`);
        return ({} as Progress);
    }
}