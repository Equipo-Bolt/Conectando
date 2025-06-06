"use server";

import { prisma } from "@/lib/prisma";

import { UpdateBusinessUnitFormData } from "@/types/BusinessUnit";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateBusinessUnitAction() is an action that creates a new catalog entry for Business Units
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link CreateDivisionFormData}> Must include new Title, Division id to set relation, and id of Business Unit to update
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateBusinessUnitAction(
  prevState: string | null,
  data: UpdateBusinessUnitFormData
): Promise<ServerActionResponse> {
  try {
    const divisionExists = await prisma.division.findUnique({
      where: { id: data.divisionId, deactivated : false }
    })

    if (!divisionExists) {
      throw new Error("No existe la Division a la que se quiere asignar");
    }

    const dupeBusinessUnit = await prisma.businessUnit.findUnique({
      where: {
        title: data.title, deactivated : false
      },
    });

    if (dupeBusinessUnit) {
      throw new Error("Ya existe una Unidad de Negocio con el título introducido");
    }

    await prisma.businessUnit.update({
      where: { id : data.id },
      data: {
        title: data.title,
        division: {
          connect: {
            id : data.divisionId
          }
        }
      },
    });

    return { success: true, message: "Unidad de Negocio Actualizada" };
  } catch (error) {
    console.log(`Failed to update Business Unit: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
