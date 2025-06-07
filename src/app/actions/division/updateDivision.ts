"use server";

import { prisma } from "@/lib/prisma";

import { UpdateDivisionFormData } from "@/types/Division";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateDivisionAction() is an action that updates an existing catalog entry for Divisions
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link UpdateDivisionFormData}> Must include new Title and id of Division to update
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateDivisionAction(
  prevState: ServerActionResponse | null,
  data: UpdateDivisionFormData
): Promise<ServerActionResponse> {
  try {
    const dupeDivision = await prisma.division.findUnique({
      where: {
        title: data.title,
      },
    });

    if (dupeDivision) {
      throw new Error("Ya existe una Division con el título introducido");
    }

    await prisma.division.update({
      where: { id: data.id },
      data: {
        title: data.title,
      },
    });

    return { success: true, message: "Division Actualizada" };
  } catch (error) {
    console.log(`Failed to update Division: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
