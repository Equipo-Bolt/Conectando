import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

/**
 * * getAllUsers() gets all created and not deactivated users
 *
 * @returns Promise of type {@link User}[]
 */

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            where: { deactived : false }
        });

        if (users.length === 0) {
            throw new Error ("No hay Usuarios")
        }

        return users.map(({ deactived, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as User[];
    } catch(error) {
        console.error(`Error fetching users: ${(error as Error).message}`);
        return ([] as User[]);
    }
}