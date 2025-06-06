"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * disableObjective This function disables one Objective
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param objectiveId<int> ID of objective to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableObjectiveAction(
  prevState: ServerActionResponse | null,
  objectiveId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.objective.update({
      where: { id: objectiveId },
      data: { deactivated: true },
    });
    return { success: true, message: "Objective has been disabled" };
  } catch (error) {
    console.error(
      `Error when disabling objective: ${(error as Error).message}`
    );
    return { success: false, error: `${(error as Error).message}` };
  }
}
