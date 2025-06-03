"use server";

import { prisma } from "@/lib/prisma";

import { CreateBusinessUnitFormData } from "@/types/BusinessUnit";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createaBusinessUnitAction() is an action that creates a new catalog entry for Business Units
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link CreateDivisionFormData}> Must include new Title and Division id to set relation
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function createBusinessUnitAction(
  prevState: string | null,
  data: CreateBusinessUnitFormData
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
        title: data.title,
      },
    });

    if (dupeBusinessUnit) {
      throw new Error("Ya existe una Unidad de Negocio con el título introducido");
    }

    await prisma.businessUnit.create({
      data: {
        title: data.title,
        division: {
          connect: {
            id : data.divisionId
          }
        }
      },
    });

    return { success: true, message: "Unidad de Negocio Creada" };
  } catch (error) {
    console.log(`Failed to create Business Unit: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
