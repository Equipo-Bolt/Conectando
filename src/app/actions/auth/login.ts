"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/app/auth";

import { ServerActionResponse } from "@/types/ServerActionResponse";
import { OTP } from "@/types/OTP";

/**
 * * loginAction action that will be used to login user wit otp
 * @param prevState<ServerActionResponse | null> set this value to null
 * @param data<{@link OTP}>
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function loginAction(
  prevState : ServerActionResponse | null,
  data: OTP
): Promise<ServerActionResponse> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.otp,
      redirect: false,
    })

    if (!result) {
      throw new Error("Credenciales Invalidas")
    }

    return {
      success: true,
      message: "Usuario logeado Código de Verificación mandado a correo",
    };
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.cause?.err?.message
          ? error.cause?.err?.message
          : "Next Auth Error",
      };
    }
    return { success: false, error: `Error: ${(error as Error).message}` };
  }
};
