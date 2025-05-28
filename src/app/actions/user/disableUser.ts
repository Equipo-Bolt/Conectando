"use server";

import { prisma } from "@/lib/prisma";

export async function disableUser(userId: number) {
    if (!userId){
        throw new Error ("No id given to disable user");
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { deactivated: true },
        });

        return "User entry has been disabled";
    } catch {
        throw new Error("Failed to disable user");
    }
}
