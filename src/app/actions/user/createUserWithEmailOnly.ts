"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * ! DEV ONLY 
 * this function was created to use login functionality
 * @param prevState 
 * @param userEmail 
 */
export async function createUserWithEmailOnlyAction(
    prevState: ServerActionResponse | null,
    userEmail: string
) : Promise<ServerActionResponse> {
    try {
        if (!userEmail) {
            throw new Error ("Email es requerido para crear usuario")
        }
        await prisma.user.create({
            data: {
                fullName: "Usuario de Desarrollo",
                email: userEmail
            }
        })
        return { success : true, message : "Usuario para Desarollo creado"}
    } catch(error) {
        console.error(`Error: ${(error as Error).message}`);
        return { success: false, error: `Error: ${(error as Error).message}` };
    }
}