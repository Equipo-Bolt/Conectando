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
    //* Checa si el usuario existe o no está desactivado
    const userExists = await getUserById(userId);
    if(!userExists.id){
      return('No se encontró el usuario')
    }

    //* Checa que hay un periodo activo
    const currentPeriod = await getCurrentPeriod();
    if(!currentPeriod.startsAt){
      return('No ha iniciado un nuevo periodo')
    }

    //* Checa si el usuario tiene un formulario activo y que se creó durante el periodo actual
    const form = await getFormIdByUserId(userId);
    if(form !== "Sin Formulario Activo"){
      return ('El usuario ya tiene un formulario de objetivos activo')
    }

    //* Checa si el usuario tiene un jefe directo
    const evaluatorId = userExists.bossID;
    if(!evaluatorId){
      return ('El usuario debe tener un jefe directo')
    }

    //* Checa si el jefe directo existe o no está desactivado
    const evaluatorExists = await getUserById(Number(evaluatorId))
    if(!evaluatorExists.id){
      return ('No se encontró el usuario del jefe directo')
    }

    await prisma.form.create({
      data: {
        approvedAt: null,
        gradedAt: null,
        collaborator: {
          connect: {
            id: userId
          }
        },
        evaluator: {
          connect: {
            id: evaluatorId
          }
        },
        progress: {
          connect: {
            id: 1
          }
        }
      }
    })

    return ("Formulario de objetivos creado");
  } catch (error) {
    throw new Error(`Error al crear formulario: ${(error as Error).message}`);
  }
}