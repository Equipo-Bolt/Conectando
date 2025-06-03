import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

/**
 * * getAllCollaboratorsOfBoss() gets a all collaborators under a Boss given the Boss's id
 * 
 * @param bossId<number> id of the boss to search for their collaborators
 * @returns Promise of type {@link User}[]
 */

export async function getAllCollaboratorsOfBoss(bossId : number ) {
    try {
        const collaborators = await prisma.user.findMany({
            where: { bossID : bossId, deactivated : false }
        });

        if (collaborators.length === 0) {
            throw new Error ("El usuario no tiene colaboradores bajo su mando")
        }

        return collaborators.map(({ deactivated, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as User[];
    } catch(error) {
        console.error(`Error fetching collaborators of boss: ${(error as Error).message}`);
        return ([] as User[]);
    }
}