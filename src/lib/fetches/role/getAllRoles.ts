import { prisma } from "@/lib/prisma";

export async function getAllRoles() {
    try {
        const roles = await prisma.role.findMany({
            where: { deactived : false }
        });

        if (roles.length === 0) {
            throw new Error ("There are no roles")
        }

        return roles.map(({ deactived, updatedAt, ...r }) => ({
            ...r,
            createdAt: r.createdAt.toISOString()
        }));
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}