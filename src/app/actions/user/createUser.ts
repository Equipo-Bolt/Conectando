"use server";

import { prisma } from '@/lib/prisma';

import { ServerActionResponse } from '@/types/ServerActionResponse';
import { CreateUserFormData } from '@/types/User';

import { getRoleById } from '@/lib/fetches/role/getRoleById';

/**
 * * createUserAction() Creates a user given an email and their role.

 * @param prevState<{@link ServerActionResponse}> Initial state of action, set this parameter to null.
 * @param data<{@link CreateUserFormData}> Must include email and roleID.
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createUserAction(
  prevState: ServerActionResponse | null,
  data: CreateUserFormData
): Promise<ServerActionResponse> {

  try {

    if (!data.email) {
      throw new Error("email es requerido en 'data'");
    }

    if (!data.roleID) {
      throw new Error("roleID es requerido en 'data'");
    }

    const user = await prisma.user.findUnique({
      where: {email: data.email}
    });

    if(user){
      throw new Error("Ya existe un usuario con ese correo")
    };

    const role = await getRoleById(parseInt(data.roleID));

    if(!role.id){
        throw new Error("El rol a asignar no existe")
    }

    await prisma.user.create({
      data: {
        email: data.email,
        role: {
          connect: {
            id: parseInt(data.roleID)
          }
        },
      }
    });

    return {success: true, message: "Usuario creado"}

  } catch (error) {
    console.error(`Error when creating user: ${(error as Error).message}`)
    return {success: false, error: `${(error as Error).message}`}
  }
} 