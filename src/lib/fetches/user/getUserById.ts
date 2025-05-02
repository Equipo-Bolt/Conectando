import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getUserById(userId : number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id : userId, deactived : false },
        });

        if (!user) {
            return ({} as TypeUser);
        }

        
        const { deactived, updatedAt, ...cleanUser } = user;
        return { ...cleanUser } as TypeUser;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}