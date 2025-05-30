"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

export async function updateUserAction(userId: number, data: FormData) {
    if (!userId){
        throw new Error ("No id given to user");
    }

    const rawNewEmployeeNumber = data.get("employeeNumber") as string | null;
    const newEmail = data.get("email") as string | null;
    const rawData = Object.fromEntries(data.entries()) as Record<string, unknown>; // ! SEGURAMENTE NO SIRVE. PLACEHOLDER PARA USAR UN DTO

    // ? NO VALIDACIONES POR LINEA, USA INTERFACES

    const newEmployeeNumber = Number(rawNewEmployeeNumber);
    if (Number.isNaN(newEmployeeNumber)) {
        throw new Error("Employee number is invalid");
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: { 
                NOT: {
                    id: userId
                },
                OR: [
                    {
                        employeeNumber: newEmployeeNumber
                    },
                    {
                        email: newEmail
                    }
                ]
            }
        });

        if (userExists) {
            throw new Error ("User with same data already exists");
        }

        await prisma.user.update({
            where: { id: userId },
            data: rawData, // ! SEGURAMENTE NO SIRVE. PLACEHOLDER PARA USAR UN DTO
        });
        return "User has been updated";
    } catch {
        throw new Error("Failed to update user");
    }
}
