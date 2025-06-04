"use server";

import { prisma } from "@/lib/prisma";

import { UpdateAreaFormData } from "@/types/Area";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateAreaAction() is an action that updates an existing catalog entry for Areas
 * @param prevState <string | null> Initial state of action, set this parameter to null
 * @param data<{@link UpdateAreaFormData}> Must include new Title and id of Area to update
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateAreaAction(
  prevState: string | null,
  data: UpdateAreaFormData
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

    await prisma.area.update({
      where: { id: data.id },
      data: {
        title: data.title,
      },
    });

    return { success: true, message: "Area Actualizada" };
  } catch (error) {
    console.log(`Failed to update area: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
