import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

/**
 * * matchOTP is a function that compares otp inputted to otp in database
 * @param userId<number> user to find the otp relation
 * @param otp<number> otp inputted by user
 * @returns Promise of ServerActionResponse
 */
export async function matchOTP(userId : number, otp : string) {
  try {
    const hasehdOTP = await prisma.userOtp.findUnique({
      where: { userID: userId },
      select: { otp: true, expiresAt : true },
    });

    const activeDate = new Date();

    if (!hasehdOTP?.otp || (activeDate > hasehdOTP.expiresAt)) {
      throw new Error("Credenciales inválidas");
    }

    const match = await bcrypt.compare(otp, hasehdOTP.otp);
    if (!match) {
      throw new Error("Credenciales inválidas");
    }

    return { success: true, message: "Credenciaes correctas" };
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
