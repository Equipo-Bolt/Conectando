"use server";

import { prisma } from "@/lib/prisma";

import { completeUserInfoSchema } from "@/lib/formSchemas/userSchema";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * hasCompletedInfoAction() Fetches a User to display in details page
 *
 * @param userEmail<string> id of the form of the use (its included in Objective data)
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function hasCompletedInfoAction(
  userEmail: string
): Promise<ServerActionResponse> {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: userEmail, deactivated: false },
    });

    if (!userExists) {
      throw new Error("El usuario no existe");
    }

    // ! Removed unnecessary data and differently named atributes
    const {
      id,
      deactivated,
      updatedAt,
      createdAt,
      bossID,
      roleID,
      businessUnitID,
      areaID,
      jobPosition,
      ...cleanUser
    } = userExists ;

    // * Redeclare object with correct atributed to use safeParse
    const toParseUser = {
      ...cleanUser,
      bossId: userExists.bossID,
      division: userExists.businessUnitID ? 1 : null,
      businessUnitId: userExists.businessUnitID,
      companySeniority: userExists.companySeniority ? "Check" : null,
      positionSeniority: userExists.positionSeniority ? "Check" : null,
      areaId: userExists.areaID,
      position: userExists.jobPosition
    };

    const result = completeUserInfoSchema.safeParse(toParseUser);

    if (!result.success) {
        throw new Error("El usuario no ha completado su información")
    }

    return { success : true, message: "El usuario ha completado su información"};
  } catch (error) {
    console.log(`Error fetching status: ${(error as Error).message}`);
    return {success: false, error: `${(error as Error).message}`}
  }
}
