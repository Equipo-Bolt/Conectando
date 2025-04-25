import { prisma } from "@/lib/prisma";
import { TypeUser } from "@/types/TypeUser";

export async function getAllBosses() {
    try {
        const bosses = await prisma.user.findMany({
            where: {
                OR:[
                    {
                        roleID : 2,
                        deactived : false 
                    },
                    {
                        roleID : 4,
                        deactived : false 
                    },
                    {
                            roleID : 6,
                        deactived : false 
                    },
                    {
                        roleID : 7,
                        deactived : false 
                    }
                ]
            }
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