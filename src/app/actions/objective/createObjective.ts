"use server";

import { prisma } from "@/lib/prisma";

import { getClassificationById } from "@/lib/fetches/classification/getClassificationById";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";

import { CreateObjectiveFormData } from "@/types/Objective";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createObjectiveAction() This function creates an objective
 * * This function searches the objective by the given ID to see if it already has an ObjectiveClassification relation
 * * to be added to, if there are no relations this function creates it.
 *
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param data<{@link CreateObjectiveFormData}> Must include classificationCatalogID to assign new classification and new atributes for "formID" | "title" | "goal" | "result" | "weight"
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createObjectiveAction(
  prevState: ServerActionResponse | null,
  data: CreateObjectiveFormData
): Promise<ServerActionResponse> {
  try {
    //! Debugging errors, should not appear for user
    const parsedData =  {  ...data, weight: Number(data.weight), classification : Number(data.classification)} 

    if (!parsedData.formID) {
      throw new Error(
        "Data debe contener en formID el id del formulario del objetivo"
      );
    }

    if (!parsedData.classification) {
      throw new Error(
        "Data debe contener en classificationCatalogID el id de la classificación del catalogo, no de a relación"
      );
    }

    if (!parsedData.title) {
      throw new Error("Data debe contener en title el titulo del objetivo");
    }

    if (!parsedData.weight) {
      throw new Error("Data debe contener en weight el peso del objetivo");
    }

    const targetClassification = await getClassificationById(parsedData.classification);

    if (!targetClassification) {
      throw new Error("La clasificación no se encuentra en los catalogos");
    }

    const targetForm = await prisma.form.findUnique({
      where: { id : data.formID },
      include: {
        objectives : {
          include: {
            objectiveClassification : true
          }
        }
      }
    })

    const relationId = targetForm?.objectives.find(
      (tfo) => tfo.objectiveClassification.classificationCatalogID === targetClassification.id
    )?.objectiveClassificationID;

    const { formID, classification, ...dataWithoutIds } = parsedData;
   
    if (!relationId) {
      const newObjectiveClassification =
        await prisma.objectiveClassification.create({
          data: {
            weight: 0,
            classificationCatalog: {
              connect: {
                id: targetClassification.id,
              },
            },
          },
        });

      await prisma.form.update({
        where: { id: parsedData.formID, deactivated: false },
        data: {
          objectives: {
            create: {
              ...dataWithoutIds,
              weight: Number(dataWithoutIds.weight),
              objectiveClassificationID: newObjectiveClassification.id,
            },
          },
        },
      });

      return {success: true, message:"Objetivo Creado"};
    }

    const duplicateObjective = await prisma.objective.findFirst({
      where: {
        ...dataWithoutIds,
        deactivated: false,
      },
      select: {
        id: true,
      },
    });

    if (duplicateObjective) {
      throw new Error("Ya existe un Objetivo identico");
    }

    await prisma.form.update({
      where: { id: parsedData.formID, deactivated: false },
      data: {
        objectives: {
          create: {
            ...dataWithoutIds,
            objectiveClassificationID: relationId,
          },
        },
      },
    });

    return { success: true, message : "Objetivo Creado"};
  } catch (error) {
    console.log(`Failed to create objective: ${(error as Error).message}`);
    return { success: false, error : (error as Error).message}
  }
}
