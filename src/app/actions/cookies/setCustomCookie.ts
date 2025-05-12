"use server"
 
import { cookies } from "next/headers"

//!Fran: creo que esta función puede ser util para desarrollo por si no hay una funcion especifica para la cookie requerida
/**
 * * setCustomCookie crea una cookie con un nombre creado por front y guarda un valor en string
 * @param cookieName<string> nombre de la cookie
 * @param value<string> nombre del valor de la cookie
 */ 
export async function setCustomCookieAction(cookieName : string, value : string) {
    if (!cookieName) {
        throw new Error("No se introdujo cookieName")
    }

    if (!value) {
        throw new Error("No se introdujo value")
    }

    try {
        const cookieStore = await cookies();

        cookieStore.set(cookieName, value, { secure: true })
    } catch {
        throw new Error("Al crear cookie")
    }
}