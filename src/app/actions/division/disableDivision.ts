"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * disableDivisionAction() This action disables one Division
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param divisionId<number> ID of Division to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableDivisionAction(
  prevState: ServerActionResponse | null,
  divisionId: number
): Promise<ServerActionResponse> {
  try {
    // ! prisma.$transaction tries to execute both querries but if one fails, none are done 
    await prisma.$transaction([
      // * Disable division
      prisma.division.update({
        where: { id: divisionId },
        data: { deactivated: true },
      }),

      // * Disable business units realted to division
      prisma.businessUnit.updateMany({
        where: {
          divisionID: divisionId,
        },
        data: {
          deactivated: true,
        },
      }),
    ]);

    return { success: true, message: "Division ha sido deshabilitada" };
  } catch (error) {
    console.log(`Error when disabling Division: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
