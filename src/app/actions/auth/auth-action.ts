"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/app/auth";

import { Login } from "@/types/Login";
import { ServerActionResponse } from "@/types/ServerActionResponse";


//! This Action will be changed to compare actually comper otp
export const loginAction = async (
  values: Login
): Promise<ServerActionResponse> => {
  try {
    await signIn("credentials", {
      email: values.email,
      redirect: false,
    });
    return {
      success: true,
      message: "Usuario logeado Código de Verificación mandado a correo",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.cause?.err?.message
          ? error.cause?.err?.message
          : "Next Auth Error",
      };
    }
    return { success: false, error: "error 500" };
  }
};
