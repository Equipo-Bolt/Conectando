import { prisma } from "@/lib/prisma";

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
            throw new Error ("Progress does not exist");
        }

        return {
            ...role,
            createdAt: role.createdAt.toISOString()
        };
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}