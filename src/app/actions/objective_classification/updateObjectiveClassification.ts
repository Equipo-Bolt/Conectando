"use server";

import { prisma } from '@/lib/prisma';
import { getObjectiveClassificationById } from '@/lib/fetches/objective_classification/getObjectiveClassificationById';
import { MutateObjectiveClassification } from '@/types/ObjectiveClassification';

/**
 * * updateObjectiveClassificationAction -> Esta función modifica el peso de una clasificación de objetivos.
 *
 * *Parametros:
 * @param prevState<string> Estado inicial para el useActionState hook.
 * @param data<MutateObjectiveClassitionInfo> ID de la clasificacion de objetivos y Peso nuevo de la clasificación de objetivos.
 * @returns Retorna un mensaje de exito o de fallo.
 */

export async function updateObjectiveClassificationAction(
  prevState: string | null,
  data: MutateObjectiveClassification) {

  //! Errores de debug
  if (!data.id) {
    throw Error ("data debe contener en id el id de la relación a actualizar")
  }
  if (!data.weight) {
    throw Error ("data debe contener en weight el nuevo peso")
  }

  try {
    //* Checa que la clasificacion de objetivos exista
    const objectiveClassificationExists = await getObjectiveClassificationById(data.id)
    if(!objectiveClassificationExists.id){
      return("Clasificación de objetivos no existe")
    }

    //* Antes de editarlo revisa si hubo un cambio en el peso
    if(objectiveClassificationExists.weight === data.weight){
      return("No se realizaron cambios, no se escogío diferente peso")
    }

    //* Checar si no es un peso invalido
    if(data.weight > 100 || data.weight <= 0){
      return("Peso inválido")
    }

    await prisma.objectiveClassification.update({
      where: {id: data.id},
      data: {weight: data.weight}
    })

    return ("Clasificación de Objetivos modificada");
  } catch (error) {
    throw new Error(`Hubo un error al modificar la clasificación de objetivos ${(error as Error).message}.`);
  }
}