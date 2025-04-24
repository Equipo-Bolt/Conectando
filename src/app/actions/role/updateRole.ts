import { prisma } from '@/lib/prisma';

export async function updateRoleAction(roleId : number, data : FormData) {
    if (!roleId){
        throw new Error ("No id given to role");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to role");
    }

    try {
        const rolesExists = await prisma.role.findUnique({
            where: { 
                NOT : {
                    id: roleId
                },
                title : newTitle,
            }
        })
    
        if (rolesExists) {
            throw new Error ("Role with same title already exists");
        }

        await prisma.role.update({
            where: { id : roleId },
            data: { title: newTitle }
        });

        return "Role has been updated";
    } catch {
        throw new Error ("Failed to update role");
    }
}