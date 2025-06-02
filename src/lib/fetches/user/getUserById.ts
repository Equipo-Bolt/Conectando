import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

/**
 * * getUserById() gets a user by its id
 * 
 * @param userId<number> id of the user to search
 * @returns Promise of type {@link User}
 */

export async function getUserById(userId : number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id : userId, deactivated : false },
        });

        if (!user) {
            throw new Error("El Usuario no existe");
        }

        
        const { deactivated, updatedAt, ...cleanUser } = user;
        return { ...cleanUser } as User;
    } catch(error) {
        console.error(`Error fetching user: ${(error as Error).message}`);
        return ({} as User);
    }
}