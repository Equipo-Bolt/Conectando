import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getAllBosses() {
    try {
        const bosses = await prisma.user.findMany({
            where: { 
                role: {
                    title: "Jefe Directo"
                },
                deactived : false }
        });

        if (bosses.length === 0) {
            throw new Error ("There are no Bosses")
        }

        return bosses.map(({ deactived, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as TypeUser[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}