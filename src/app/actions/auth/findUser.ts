"use server";
import { ServerActionResponse } from "@/types/ServerActionResponse";
import { sendOTP } from "@/utils/sendOTP";


/**
 * ! Not fully implemented, always sends otp
 * * findUserAction checks db for user email and if found sends otp
 * @param prevState
 * @param userEmail<string> id del usuario a guardar
 */

export async function findUserAction(
  prevState: ServerActionResponse | null,
  userEmail: string
): Promise<ServerActionResponse> {
  try {
    sendOTP(userEmail);
    return { success: true, message: userEmail + "Encontrado" };
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    return { success: false, error: `Error: ${(error as Error).message}` };
  }
}
