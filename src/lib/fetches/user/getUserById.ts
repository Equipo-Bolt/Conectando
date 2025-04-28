import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getUserById(userId : number) {
    try {
        const user = await prisma.user.findFirst({
            where: { id : userId, deactived : false },
        });

        if (!user) {
            throw new Error ("User was not found");
        }

        return user as TypeUser;
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}