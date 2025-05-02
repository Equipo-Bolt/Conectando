"use server";

import { prisma } from '@/lib/prisma';
import { getUserById } from '@/lib/fetches/user/getUserById';
import { getFormIdByUserId } from '@/lib/fetches/form/getFormIdByUserId';
import { getCurrentPeriod } from '@/lib/fetches/period/getCurrentPeriod';

/**
 * * createFormAction() -> Esta función crea un formulario de objetivos y puede (debe) usarse con useActionSate
 *
 * *Parametros:
 * @param prevState<string> Estado inicial de la action, debe ser nulo o "Enviando...".
 * @param userId<number> ID del usuario que quiere crear un formulario de objetivos.
 * @returns Retorna un mensaje o estado de la accion. Puede ser "Se creo" o "Hubo un error".
 */

export async function createFormAction(
  prevState: string | null,
  userId: number
) {

  try {
    // Checks if the user exists or is not deactivated
    const userExists = getUserById(userId);
    //! NOT SURE IF THIS IS NECESSARY SINCE getUserById THROWS AN ERROR IF IT DOESNT FIND ONE
    if(!userExists){
      return('User does not exist.')
    }
    // Checks if there is a current period
    const currentPeriod = await getCurrentPeriod();
    //! SAME FOR getCurrentPeriod
    if(!currentPeriod){
      return("A new period has not started yet.")
    }

    // Checks if the user has a form and if it was created in the current period
    const form = await getFormIdByUserId(userId);
    if(form !== "No Current Form"){
      return ('User already has an active form.')
    }

    // Checks if the user has a boss linked to them
    const evaluatorId = (await getUserById(userId)).bossID;
    if(!evaluatorId){
      return ('User must have a registered boss.')
    }

    // Checks if the boss exists or is not deactivated
    const evaluatorExists = await getUserById(Number(evaluatorId))
    if(!evaluatorExists){
      return ("User's boss does not exist.")
    }

    await prisma.form.create({
      data: {
        approvedAt: null,
        gradedAt: null,
        collaboratorID: userId,
        evaluatorID: Number(evaluatorId),
        progressID: 1
      }
    })

    return ("Form created for user");
  } catch (error) {
    throw new Error(`Failed to create form: ${(error as Error).message}`);
  }
}