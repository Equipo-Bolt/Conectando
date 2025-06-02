"use server";

import { AuthError } from "next-auth";

import { signOut } from "@/app/auth";

import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * loginAction action that authenticates the user via otp
 * @param prevState<ServerActionResponse | null> set this value to null
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function logOut(
  prevState : ServerActionResponse | null,
  message = "Usuario ha cerrado su sesión"
): Promise<ServerActionResponse> {
  try {

    await signOut()

    return {
      success: true,
      message: message,
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
