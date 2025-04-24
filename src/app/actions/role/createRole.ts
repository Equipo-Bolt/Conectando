"use server";

import { prisma } from '@/lib/prisma';

export async function createRoleAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new role");
    }

    try {
        const rolesExists = await prisma.role.findUnique({
            where: { 
                title : newTitle,
            }
        });
    
        if (rolesExists) {
            throw new Error ("Role with same title already exists");
        }

        await prisma.role.create({
            data: {
                title: newTitle
            }
        });

        return "Role created";
    } catch {
        throw new Error ("Failed to create role");
    }
}