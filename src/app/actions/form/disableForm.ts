"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";
/**
 * * disableForm This function disables one Form
 * @param formId<int> ID of form to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableForm(
  formId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.form.update({
      where: { id: formId },
      data: { deactived: true },
    });
    return { success: true, message: "Formulario ha sido desactivado" };
  } catch (err) {
    console.error(
      `Error when disabling objectives form: ${(err as Error).message}`
    );
    return { success: false, error: `${(err as Error).message}` };
  }
}
