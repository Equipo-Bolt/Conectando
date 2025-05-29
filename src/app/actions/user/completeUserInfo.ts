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
      businessUnitId: Number(data.businessUnitId),
      bossId: Number(data.bossId),
      areaId: Number(data.areaId),
      companySeniority: new Date(data.companySeniority),
      positionSeniority: new Date(data.positionSeniority),
    };

    const dupeEmail = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (dupeEmail) {
      throw new Error("Ya no existe un usuario con el mismo correo");
    }

    const dupeEmployeeNumber = await prisma.user.findFirst({
      where: { employeeNumber: parsedData.employeeNumber },
    });

    if (dupeEmployeeNumber) {
      throw new Error(
        "Ya no existe un usuario con el mismo número de empleado"
      );
    }

    const {
      businessUnitId,
      bossId,
      areaId,
      position,
      division,
      email,
      ...dataWithoutIDs
    } = parsedData;

    await prisma.user.update({
      where: { email : parsedData.email },
      data: {
        ...dataWithoutIDs,
        businessUnit: {
          connect: {
            id: parsedData.businessUnitId,
          },
        },
        boss: {
          connect: {
            id: parsedData.bossId,
          },
        },
        area: {
          connect: {
            id: parsedData.areaId,
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
