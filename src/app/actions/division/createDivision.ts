"use server";

import { prisma } from "@/lib/prisma";

import { CreateDivisionFormData } from "@/types/Division";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createaDivisionAction() is an action that creates a new catalog entry for Divisions
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link CreateDivisionFormData}> Must include new Title
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function createDivisionAction(
  prevState: string | null,
  data: CreateDivisionFormData
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

    await prisma.division.create({
      data: {
        title: data.title,
      },
    });

    return { success: true, message: "Division Creada" };
  } catch (error) {
    console.log(`Failed to create division: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
