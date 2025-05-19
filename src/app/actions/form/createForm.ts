"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";

import { getUserById } from "@/lib/fetches/user/getUserById";
import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getCurrentPeriod } from "@/lib/fetches/period/getCurrentPeriod";

/**
 * * createFormAction() Creates an objectives form with initial progress for logged user

 * @param prevState<string> Initial state of action, must null or loading string in Spanish
 * @param userId<number> ID of the logged in user
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createFormAction(
  prevState: string | null,
  userId: number
): Promise<ServerActionResponse> {
  try {
    //* Check if user exists
    const userExists = await getUserById(userId);
    if (!userExists.id) {
      throw new Error("No se encontró el usuario" );
    }

    //* Check if there is current period
    const currentPeriod = await getCurrentPeriod();
    if (!currentPeriod.startsAt) {
      throw new Error("No ha iniciado un nuevo periodo");
    }

    //* Check if user has active form and is from current period 
    const formExists = await getFormIdByUserId(userId);
    if (formExists !== "Sin Formulario Activo") {
      throw new Error("El usuario ya tiene un formulario de objetivos activo");
    }

    //* Check if user has Boss
    const evaluatorId = userExists.bossID;
    if (!evaluatorId) {
      throw new Error("El usuario debe tener un jefe directo");
    }

    //* Check id Boss is active in db
    const evaluatorExists = await getUserById(Number(evaluatorId));
    if (!evaluatorExists.id) {
      throw new Error("No se encontró el usuario del jefe directo en la base de datos");
    }

    await prisma.form.create({
      data: {
        approvedAt: null,
        gradedAt: null,
        collaborator: {
          connect: {
            id: userId,
          },
        },
        evaluator: {
          connect: {
            id: evaluatorId,
          },
        },
        progress: {
          connect: {
            id: 1,
          },
        },
      },
    });
    
    return { success: true, message: "Formulario de Objetivos Creado"};

  } catch (err) {
    console.error(`Error when creating objectives form: ${(err as Error).message}`);
    return { success: false, error: `${(err as Error).message}` };
  } 
}