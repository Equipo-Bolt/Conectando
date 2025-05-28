import { prisma } from "@/lib/prisma";

import { completeInfoSchema } from "@/lib/formSchemas/completeInfoSchema";
import { CompleteInfoSchemaType } from "@/types/User";
import { InfoStatus } from "@/types/User";

/**
 * * getInfoStatusOfUser() Fetches a User to display in details page
 *
 * @param userdId<number> id of the form of the use (its included in Objective data)
 * @returns Promise of type {@link InfoStatus}
 */

export async function getInfoStatusOfUser(
  userdId: number
): Promise<InfoStatus> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userdId, deactivated: false },
    });

    if (!user) {
      throw new Error("El usuario no existe");
    }

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
    } = user ;

    const toParseUser = {
      ...cleanUser,
      bossId: user.bossID,
      division: user.businessUnitID ? 1 : null,
      businessUnitId: user.businessUnitID,
      companySeniority: user.companySeniority ? "Check" : null,
      positionSeniority: user.positionSeniority ? "Check" : null,
      areaId: user.areaID,
      position: user.jobPosition
    };

    const result = completeInfoSchema.safeParse(toParseUser);

    if (!result.success) {
        throw new Error("Usuario no ha completado su información")
    }

    return "Completed";
  } catch (error) {
    console.log(`Error fetching status: ${(error as Error).message}`);
    return "NotCompleted";
  }
}
