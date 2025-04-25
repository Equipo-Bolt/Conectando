import { prisma } from "@/lib/prisma";
import { TypeComment } from "@/types/TypeComment";

export async function getCommnentById(commentId : number) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id : commentId },
            select: {
                id: true,
                description: true,
                commentedAt: true,
                objectiveID: true,
                createdAt: true
            }            
        })

        if (!comment) {
            throw new Error ("Comment does not exist");
        }

        return comment as TypeComment;
        } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}