"use server";

import { prisma } from "@/lib/prisma";
import { Comment } from "@/types/Comment";

//! THE FUNCTION GETOBJECTIVEBYID ALREADY RETURNS THE OBJECTIVES COMMENTS, RENDERING THIS FUNCTION OBSOLETE

/**
 * * getCommentsFromObjective() gets all comments associated to an objective
 * 
 * @param objectiveId<number> id of the objective to search for comments
 * @returns Promise of type {@link Comment}[]
 */

export async function getCommentsFromObjective( objectiveId : number ) {
    try {
        const comments = await prisma.comment.findMany({
            where: { deactivated : false, objectiveID : objectiveId }
        });

        if (comments.length === 0) {
            throw new Error ("No hay commentarios para ese objetivo")
        }

        return comments.map(({ deactivated, updatedAt, ...c }) => ( c )) as Comment[];
    } catch(error) {
        console.error(`Error fetching comments: ${(error as Error).message}`);
        return ([] as Comment[]);
    }
}