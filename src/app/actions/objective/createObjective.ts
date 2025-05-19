"use server";

import { prisma } from "@/lib/prisma";

import { getClassificationById } from "@/lib/fetches/classification/getClassificationById";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";

import { MutateObjectiveInfo } from "@/types/Objective";

/**
 * * createObjectiveAction() -> Esta función crea un objetivo y puede (debe) usarse con useActionSate
 * * Esta función tambien se encarga de buscar si el objetivo que estas creando ya va estar asignado a una-
 * * -relación de Objectivo-Clasificación, si no la encuentra la crea
 * 
 * *Parametros:
 * @param prevState<string> Estado inicial de la action, debe ser nulo o "Enviando..."
 * @param data<TypeObjective> El objeto de TypeObjective creado a partir de la información del formulario para crear objectivo
 * * data.classificationCatalogID<string> Id de la Clasificacion del Catalogo de la db (las que son <U4tr0)
 * @returns Retorna un mensaje o estado de la accion. Puede ser "Se creo" o "Hubo un error".
 */

export async function createObjectiveAction(
  prevState: string | null,
  data: MutateObjectiveInfo //* TypeObjective ya incluye los ids de form y de clasificacion
) {
  //! ERRORES para debugeo
  if (!data.formID) {
    throw new Error("formID es requerida en data");
  }

  if (!data.classificationCatalogID) {
    throw new Error("classicationId is es requerida en data")
  }

  if (!data.title) {
    throw new Error("title es requerida en data")
  }

  if(!data.weight) {
    throw new Error("weight es requerida en data")
  }

  try {
    //* Logica insana para buscar relación Objective-Classification si ya la hay

    //* 1. Conseguimos la clasificacion
    const classification = await getClassificationById(Number(data.classificationCatalogID));

    if (!classification) {
      throw new Error ("La clasificación no se encuentra en los catalogos")
    }

    //* 2. Conseguimos los demas Objetivos del Formulario
    const objectivesFromObjectives = await getObjectivesByFormId(data.formID);

    //* 3. Verificar que haya objetivos con la misma clasificación (osea esos ya nos diran que hay relacion)
    const relationId = objectivesFromObjectives.find(
      (ofo) => ofo.classificationTitle === classification.title
    )?.objectiveClassificationID;

    //! sacar id y formId de data, nombre feo pero se entiende
    const { id, formID, classificationCatalogID, ...dataWithoutIds } = data; 
    //* 3.5 Creamos la relación si es la primera vez que hacemos un objetivo y creamos el objetivo
    if (objectivesFromObjectives.length === 0 || !relationId) {
      //*primero la objectiveClassification
      const newObjectiveClassification = await prisma.objectiveClassification.create({
        data: {
          weight: 0,
          classificationTitle: {
            connect: {
              id : classification.id
            }
          }
        }
      })

      //*segundo crear el objetivo, creandolo dentro del form  
      await prisma.form.update({
        where: { id: data.formID, deactived: false },
        data: {
          objectives: {
            create: {
              ...dataWithoutIds,
              objectiveClassificationID: newObjectiveClassification.id
            },
          },
        },
      });

      return "Objetivo Creado"; //!Success
    }

    //* 4. Existe relación? Va ahora checa que no este repetido el obj
    const duplicateObjective = await prisma.objective.findFirst({
      where: { 
        ...dataWithoutIds,
        deactived: false
      },
      select:{
        id: true
      }
    })

    if (duplicateObjective) {
      return "Ya existe un Objetivo identico" //! Fail
    }

    await prisma.form.update({
      where: { id: data.formID, deactived: false },
      data: {
        objectives: {
          create: {
            ...dataWithoutIds,
            objectiveClassificationID: relationId,
          },
        },
      },
    });

    return "Objetivo Creado"; //!Success
  } catch (error) {
    throw new Error(`Failed to create objective: ${(error as Error).message}`);
  }
}
