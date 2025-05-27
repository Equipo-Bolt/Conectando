"use server";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/ServerActionResponse";
import { sendOTP } from "@/utils/OTP/sendOTP";


/**
 * * findUserAction checks db for user email and if found sends otp
 * @param prevState<{@link ServerActionResponse}> 
 * @param userEmail<string> email del usuario a buscar
 */

export async function findUserAction(
  prevState: ServerActionResponse | null,
  userEmail: string
): Promise<ServerActionResponse> {
  try {

    const user = await prisma.user.findUnique({
      where: {email: userEmail, deactivated: false}
    });

    if(!user){
      throw new Error("El usuario no está registrado en el sistema")
    }

    await sendOTP(userEmail);
    return { success: true, message: userEmail + "Se mandó un correo de autenticación" };
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    return { success: false, error: `Error: ${(error as Error).message}` };
  }
}
