"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * disableAreaAction() This action disables one Area
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param areaId<number> ID of Area to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableAreaAction(
  prevState: ServerActionResponse | null,
  areaId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.area.update({
      where: { id: areaId },
      data: { deactivated: true },
    });
    return { success: true, message: "Area ha sido deshabilitada" };
  } catch (error) {
    console.log(`Error when disabling Area: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
