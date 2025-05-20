import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

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
        })) as User[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}