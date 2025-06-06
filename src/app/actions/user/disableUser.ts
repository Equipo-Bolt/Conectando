"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";

import { getUserById } from "@/lib/fetches/user/getUserById";
import { User } from "@/types/User";

export async function disableUser(userId: number): Promise<ServerActionResponse> {

    try {
        if (!userId){
            throw new Error ("No id given to disable user");
        }

        const toDeleteUser = await getUserById(userId)
        if(!toDeleteUser.id){
            throw new Error("El usuario a eliminar no existe")
        }

        const sameEmailUsers = await prisma.user.count({
            where: {
                email: {contains: toDeleteUser.email}
            },
        })

        await prisma.user.update({
            where: { id: userId },
            data: {
                email: toDeleteUser.email + "$".repeat(sameEmailUsers),
                deactivated: true
             },
        });

        return {success: true, message: "Usuario desactivado"};
    } catch (error) {
        console.error(`Error when disabling user: ${(error as Error).message}`)
        return {success: false, error: `${(error as Error).message}`}
    }
}
