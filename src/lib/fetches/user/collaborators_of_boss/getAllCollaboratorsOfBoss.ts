import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

export async function getAllCollaboratorsOfBoss(bossId : number ) {
    try {
        const collaborators = await prisma.user.findMany({
            where: { bossID : bossId, deactived : false }
        });

        if (collaborators.length === 0) {
            throw new Error ("User has no collaborators")
        }

        return collaborators.map(({ deactived, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as User[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}