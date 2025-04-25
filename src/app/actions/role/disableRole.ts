"use server";

import { prisma } from '@/lib/prisma';

export async function disableRoleAction(roleId : number) {
    if (!roleId){
        throw new Error ("No id given to disable role");
    }

    try {
        await prisma.role.update({
            where: { id : roleId },
            data: { deactived : true }
        });

        return "Role has been disabled";
    } catch {
        throw new Error ("Failed to disable role");
    }
}