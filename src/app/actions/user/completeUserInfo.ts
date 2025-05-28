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
      employeeNumber : Number(data.employeeNumber),
      businessUnitId: Number(data.businessUnitId),
      bossId: Number(data.bossId),
      companySeniority: new Date(data.companySeniority),
      positionSeniority: new Date(data.positionSeniority),
    };

    const userExists = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!userExists) {
      throw new Error("Ya no existe un usuario con ese correo");
    }

    const { businessUnitId, bossId, ...dataWithoutIDs } = parsedData;

    await prisma.user.create({
      data: {
        ...dataWithoutIDs,
        businessUnit: {
            connect: {
                id : parsedData.businessUnitId
            }
        },
        boss: {
            connect : {
                id : parsedData.bossId
            }
        }
      },
    });

    return { success: true, message: "Usuario ha completado su información" };
  } catch (error) {
    console.error(`Error when creating user: ${(error as Error).message}`);
    return { success: false, error: `${(error as Error).message}` };
  }
}
