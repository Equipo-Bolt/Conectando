"use server";

import { prisma } from "@/lib/prisma";

import { ServerActionResponse } from "@/types/ServerActionResponse";
import { CompleteInfoSchemaType } from "@/types/User";

/**
 * * completeUserInfoAction() Action that updates user with mandatory remaining data.

 * @param prevState<{@link ServerActionResponse}> Initial state of action, set this parameter to null.
 * @param data<{@link CompleteInfoSchemaType}> Must include all data to complete user info.
 * 
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function completeUserInfoAction(
  prevState: ServerActionResponse | null,
  data: CompleteInfoSchemaType
): Promise<ServerActionResponse> {
  try {
    const parsedData = {
      ...data,
      jobPosition: data.position,
      employeeNumber: Number(data.employeeNumber),
      businessUnitID: Number(data.businessUnitID),
      bossID: Number(data.bossID),
      areaID: Number(data.areaID),
      companySeniority: new Date(data.companySeniority),
      positionSeniority: new Date(data.positionSeniority),
    };

    const dupeEmployeeNumber = await prisma.user.findFirst({
      where: { employeeNumber: parsedData.employeeNumber },
    });

    if (dupeEmployeeNumber && dupeEmployeeNumber.email != parsedData.email) {
      throw new Error(
        "Ya existe un usuario con el mismo número de empleado"
      );
    }

    const {
      businessUnitID,
      bossID,
      areaID,
      position,
      divisionID,
      roleID,
      email,
      ...dataWithoutIDs
    } = parsedData;

    await prisma.user.update({
      where: { email : parsedData.email },
      data: {
        ...dataWithoutIDs,
        businessUnit: {
          connect: {
            id: parsedData.businessUnitID,
          },
        },
        boss: {
          connect: {
            id: parsedData.bossID,
          },
        },
        area: {
          connect: {
            id: parsedData.areaID,
          },
        },
      },
    });

    return { success: true, message: "Usuario ha completado su información" };
  } catch (error) {
    console.error(`Error when creating user: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
