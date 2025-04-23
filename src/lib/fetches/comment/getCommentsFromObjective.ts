import { prisma } from "@/lib/prisma";
import { TypeComment } from "@/types/TypeComment";

export async function getCommentsFromObjective( objectiveId : number ) {
    try {
        const comments = await prisma.comment.findMany({
            where: { deactived : false, objectiveID : objectiveId }
        });

        if (comments.length === 0) {
            throw new Error ("There are no Comments for this objective")
        }

        return comments.map(({ deactived, updatedAt, ...c }) => ( c )) as TypeComment[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}