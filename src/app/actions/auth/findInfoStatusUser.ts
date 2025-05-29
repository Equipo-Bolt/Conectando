"use server";

import { prisma } from "@/lib/prisma";

import { InfoStatus } from "@/types/User";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * getInfoStatusOfUser() Fetches a User to display in details page
 *
 * @param userdId<number> id of the form of the use (its included in Objective data)
 * @returns Promise of type {@link InfoStatus}
 */

export async function findInfoStatusUserAction(
    prevState: InfoStatus | null,
    userEmail: string
): Promise<ServerActionResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail, deactivated: false },
    });

    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Check if user has all fields filled
    if (
        !user.areaID ||
        !user.roleID ||
        !user.businessUnitID ||
        !user.companyContribution ||
        !user.companySeniority ||
        !user.createdAt ||
        !user.deactivated ||
        !user.email ||
        !user.employeeNumber ||
        !user.fullName ||
        !user.id ||
        !user.jobPosition ||
        !user.positionSeniority ||
        !user.roleID ||
        !user.updatedAt
    ) {
        // If any field is missing, return an error
        return {
            success: false,
            error: "El usuario no ha completado toda su información"
        };
       
    }

    return {
      success: true,
      message: "Usuario ha completado su información"
    };
  } catch (error) {
    return {
        success: false,
        error: `Error fetching status: ${(error as Error).message}`
    };
  }
}
