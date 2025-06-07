"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * disableBusinessUnitAction() This action disables one Business Unit
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param businessUnitId<number> ID of Business Unit to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableBusinessUnitAction(
  prevState: ServerActionResponse | null,
  businessUnitId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.businessUnit.update({
      where: { id: businessUnitId },
      data: { deactivated: true },
    });
    return { success: true, message: "Unidad de Negocio ha sido deshabilitada" };
  } catch (error) {
    console.log(`Error when disabling Business Unit: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
