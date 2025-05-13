import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            where: { deactived : false }
        });

        if (users.length === 0) {
            throw new Error ("There are no users")
        }

        return users.map(({ deactived, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as TypeUser[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}