"use server";

import { prisma } from '@/lib/prisma';
import { getObjectiveClassificationById } from '@/lib/fetches/objective_classification/getObjectiveClassificationById';

/**
 * * updateObjectiveClassification -> Esta función modifica el peso de una clasificación de objetivos.
 *
 * *Parametros:
 * @param prevState<string> Estado inicial para el useActionState hook.
 * @param objectiveClassificationId<number> ID de la clasificacion de objetivos.
 * @param newWeight<number> Peso nuevo de la clasificación de objetivos.
 * @returns Retorna un mensaje de exito o de fallo.
 */

export async function updateObjectiveClassification(
  prevState: string | null,
  objectiveClassificationId: number,
  newWeight: number) {
  try {

    // Checa que la clasificacion de objetivos exista
    const objectiveClassificationExists = await getObjectiveClassificationById(objectiveClassificationId)
    if(!objectiveClassificationExists.id){
      return("Clasificación de objetivos no existe")
    }

    // Antes de editarlo revisa si hubo un cambio en el peso
    if(objectiveClassificationExists.weight === newWeight){
      return("No se realizaron cambios")
    }

    // Checar si no es un peso invalido
    if(newWeight > 100 || newWeight < 0){
      return("Peso inválido")
    }

    await prisma.objectiveClassification.update({
      where: {id: objectiveClassificationId},
      data: {weight: newWeight}
    })

    return "Clasificación de Objetivos modificada";
  } catch (error) {
    throw new Error('Hubo un error al modificar la clasificación de objetivos');
  }
}