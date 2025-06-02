import { prisma } from "@/lib/prisma";
import { Role } from "@/types/Role";

/**
 * * getAllRoles() gets all created and not deactivated roles
 *
 * @returns Promise of type {@link Role}[]
 */

export async function getAllRoles() {
    try {
        const roles = await prisma.role.findMany({
            where: { deactivated : false }
        });

        if (roles.length === 0) {
            throw new Error ("No hay Roles")
        }

        return roles.map(({ deactivated, updatedAt, ...r }) => ({
            ...r,
            createdAt: r.createdAt.toISOString()
        })) as Role[];
    } catch(error) {
        console.error(`Error fetching roles: ${(error as Error).message}`);
        return ([] as Role[]);
    }
}