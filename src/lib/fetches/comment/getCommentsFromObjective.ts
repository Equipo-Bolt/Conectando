"use server";

import { prisma } from "@/lib/prisma";
import { Comment } from "@/types/Comment";

export async function getCommentsFromObjective( objectiveId : number ) {
    try {
        const comments = await prisma.comment.findMany({
            where: { deactived : false, objectiveID : objectiveId }
        });

        if (comments.length === 0) {
            return [] as Comment[];
        }

        return comments.map(({ deactived, updatedAt, ...c }) => ( c )) as Comment[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}