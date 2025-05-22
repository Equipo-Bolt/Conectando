import { prisma } from "@/lib/prisma";
import { Comment } from "@/types/Comment";

/**
 * * getCommentById() gets a comment by its id
 * 
 * @param commentId<number> id of the comment to search
 * @returns Promise of type {@link Comment}
 */

export async function getCommentById(commentId : number) {
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
            throw new Error ("El Comentario no existe");
        }

        return comment as Comment;
    } catch(error) {
        console.error(`Error fetching comment: ${(error as Error).message}`);
        return ({} as Comment);
    }
}