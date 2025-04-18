import { prisma } from '@/lib/prisma';

export async function createRoleAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new role");
    }

    try {
        await prisma.role.create({
            data: {
                title: newTitle
            }
        })

        return "Role created";
    } catch (error) {
        throw new Error ("Failed to create role");
    }
}