import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

/**
 * * getAllBosses() gets all created and not deactivated users that are bosses
 *
 * @returns Promise of type {@link User}[]
 */

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
            throw new Error ("No hay Jefes Directos")
        }

        return bosses.map(({ deactived, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as User[];
    } catch(error) {
        console.error(`Error fetching bosses: ${(error as Error).message}`);
        return ([] as User[]);
    }
}