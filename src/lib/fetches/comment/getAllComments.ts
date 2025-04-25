import { prisma } from "@/lib/prisma";
import { TypeComment } from "@/types/TypeComment";

export async function getAllComments() {
    try {
        const comments = await prisma.comment.findMany({
            where: { deactived : false }
        });

        if (comments.length === 0) {
            throw new Error ("There are no Comments")
        }

        return comments.map(({ deactived, updatedAt, ...c }) => c) as TypeComment[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}