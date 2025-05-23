import { prisma } from "@/lib/prisma";
import { Comment } from "@/types/Comment";

/**
 * * getAllComments() gets all created and not deactivated comments
 *
 * @returns Promise of type {@link Comment}[]
 */

export async function getAllComments() {
    try {
        const comments = await prisma.comment.findMany({
            where: { deactived : false }
        });

        if (comments.length === 0) {
            throw new Error ("No hay commentarios")
        }

        return comments.map(({ deactived, updatedAt, ...c }) => c) as Comment[];
    } catch(error) {
        console.error(`Error fetching comments: ${(error as Error).message}`);
        return ([] as Comment[]);
    }
}