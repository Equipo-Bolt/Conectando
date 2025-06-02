import { prisma } from "@/lib/prisma";
import { Role } from "@/types/Role";

/**
 * * getRoleById() gets a role by its id
 * 
 * @param roleId<number> id of the role to search
 * @returns Promise of type {@link Role}
 */

export async function getRoleById(roleId : number) {
    try {
        const role = await prisma.role.findUnique({
            where: { id : roleId },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        if (!role) {
            throw new Error ("El Rol no existe");
        }

        return {
            ...role,
            createdAt: role.createdAt.toISOString()
        } as Role;
    } catch(error) {
        console.error(`Error fetching role: ${(error as Error).message}`);
        return ({} as Role);
    }
}