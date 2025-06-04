"use server";

import { prisma } from "@/lib/prisma";

import { CreateAreaFormData } from "@/types/Area";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createaAreaAction() is an action that creates a new catalog entry for Areas
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link CreateAreaFormData}> Must include new Title
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function createAreaAction(
  prevState: string | null,
  data: CreateAreaFormData
): Promise<ServerActionResponse> {
  try {
    const dupeArea = await prisma.area.findUnique({
      where: {
        title: data.title,
      },
    });

    if (dupeArea) {
      throw new Error("Ya existe una Area con el título introducido");
    }

    await prisma.area.create({
      data: {
        title: data.title,
      },
    });

    return { success: true, message: "Area Creada" };
  } catch (error) {
    console.log(`Failed to create area: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
