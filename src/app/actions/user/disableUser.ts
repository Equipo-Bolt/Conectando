"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";

export async function disableUser(userId: number): Promise<ServerActionResponse> {
    if (!userId){
        throw new Error ("No id given to disable user");
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { deactivated: true },
        });

        return {success: true, message: "Usuario desactivado"};
    } catch (error) {
        console.error(`Error when disabling user: ${(error as Error).message}`)
        return {success: false, error: `${(error as Error).message}`}
    }
}
