"use server";

import { cookies } from "next/headers";

/**
 * * setCustomCookie creates a custom cookie, mostly used in development
 * @param cookieName<string> name of the custom cookie
 * @param value<string> value of the custom cookie
 */
export async function setCustomCookieAction(cookieName: string, value: string) {
  try {
    if (!cookieName) {
      throw new Error("No cookieName was given");
    }

    if (!value) {
      throw new Error("No value for custom cookie was given");
    }
    const cookieStore = await cookies();

    cookieStore.set(cookieName, value, { secure: true });
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}