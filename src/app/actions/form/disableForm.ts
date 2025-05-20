"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";
/**
 * * disableForm This function disables one Form
 * @param formId<int> ID of form to disable
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function disableForm(
  prevState: ServerActionResponse | null,
  formId: number
): Promise<ServerActionResponse> {
  try {
    await prisma.form.update({
      where: { id: formId },
      data: { deactived: true },
    });
    return { success: true, message: "Formulario ha sido desactivado" };
  } catch (error) {
    console.error(
      `Error when disabling objectives form: ${(error as Error).message}`
    );
    return { success: false, error: `${(error as Error).message}` };
  }
}
