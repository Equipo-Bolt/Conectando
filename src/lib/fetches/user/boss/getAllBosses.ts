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
                        deactivated : false 
                    },
                    {
                        roleID : 4,
                        deactivated : false 
                    },
                    {
                            roleID : 6,
                        deactivated : false 
                    },
                    {
                        roleID : 7,
                        deactivated : false 
                    }
                ]
            }
        });

        if (bosses.length === 0) {
            throw new Error ("No hay Jefes Directos")
        }

        return bosses.map(({ deactivated, updatedAt, ...u }) => ({
            ...u,
            createdAt: u.createdAt
        })) as User[];
    } catch(error) {
        console.error(`Error fetching bosses: ${(error as Error).message}`);
        return ([] as User[]);
    }
}