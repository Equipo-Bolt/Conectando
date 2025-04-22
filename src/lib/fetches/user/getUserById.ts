import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getAllUsers(userId : number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id : userId, deactived : false },
            select: { 
                updatedAt : false, 
                deactived : false
            }
        });

        if (!user) {
            throw new Error ("User was not found");
        }

        return user as TypeUser;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}