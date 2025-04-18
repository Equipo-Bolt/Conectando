import { prisma } from "@/lib/prisma";

export async function getClassificationById(classificationId : number) {
    try {
        const classification = await prisma.classification.findUnique({
            where: { id : classificationId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!classification) {
            throw new Error ("Classification does not exist");
        }

        return {
            ...classification,
            createdAt: classification.createdAt.toISOString()
        };
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}