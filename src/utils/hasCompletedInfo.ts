import { prisma } from "@/lib/prisma";

import { completeUserInfoSchema } from "@/lib/Schemas/formSchemas/userSchema";
import { ServerActionResponse } from "@/types/ServerActionResponse";
import { getBusinessUnitById } from "@/lib/fetches/business_unit/getBusinessUnitById";

/**
 * * hasCompletedInfo() Fetches a User to display in details page
 * @param prevState<ServerActionResponse | null> previous state of action, set it to null
 * @param userId<number> id of the form of the use (its included in Objective data)
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function hasCompletedInfo(
  userId: number
): Promise<ServerActionResponse> {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId, deactivated: false },
    });

    if (!userExists) {
      throw new Error("El usuario no existe");
    }
    
    const businessUnit = await getBusinessUnitById(
      userExists.businessUnitID ? userExists.businessUnitID : 0
    );

    if (!businessUnit.id) {
      throw new Error("La unidad de negocio no existe");
    }

    const divisionID = businessUnit.divisionID

    // ! Removed unnecessary data and differently named atributes
    const {
      deactivated,
      updatedAt,
      createdAt,
      bossID,
      businessUnitID,
      areaID,
      jobPosition,
      roleID,
      employeeNumber,
      ...cleanUser
    } = userExists ;

    // * Redeclare object with correct atributed to use safeParse
    const toParseUser = {
      ...cleanUser,
      employeeNumber: String(employeeNumber),
      bossID: String(userExists.bossID),
      roleID: String(userExists.roleID),
      divisionID: String(divisionID),
      businessUnitID: String(userExists.businessUnitID),
      companySeniority: String(userExists.companySeniority),
      positionSeniority: String(userExists.positionSeniority),
      areaID: String(userExists.areaID),
      position: String(userExists.jobPosition)
    };

    const result = completeUserInfoSchema.safeParse(toParseUser);

    if (!result.success) {
        throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    return { success : true, 
      message: String(roleID) 
    };
  } catch (error) {
    console.log(`Error fetching status: ${(error as Error).message}`);
    return {success: false, error: `${(error as Error).message}`}
  }
}
