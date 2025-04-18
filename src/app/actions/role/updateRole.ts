import { prisma } from '@/lib/prisma';

export async function updateRoleAction(roleId : number, data : FormData) {
    if (!roleId){
        throw new Error ("No id given to disable role");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to role");
    }

    const rolesExists = await prisma.role.findUnique({
        where: { title : newTitle }
    })

    if (rolesExists) {
        throw new Error ("Role with same title already exists");
    }

    try {
        await prisma.role.update({
            where: { id : roleId },
            data: { title: newTitle }
        })

        return "Role has been updated";
    } catch (error) {
        throw new Error ("Failed to update role");
    }
}