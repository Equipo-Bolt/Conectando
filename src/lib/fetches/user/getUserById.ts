import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

export async function getUserById(userId : number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id : userId, deactived : false },
        });

        if (!user) {
            return ({} as User);
        }

        
        const { deactived, updatedAt, ...cleanUser } = user;
        return { ...cleanUser } as User;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}