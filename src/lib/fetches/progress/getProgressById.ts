import { prisma } from "@/lib/prisma";

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
            throw new Error ("Progress does not exist");
        }

        return {
            ...progress,
            createdAt: progress.createdAt.toISOString()
        };
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}