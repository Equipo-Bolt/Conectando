"use server"
 
import { cookies } from "next/headers"

//* doc: https://nextjs.org/docs/app/api-reference/functions/cookies

/**
 * * setUserId crea una cookie que guarda el userId en formato string
 * @param userId id del usuario a guardar
 */ 
export async function setUserId(userId : number) {
    try {
        const cookieStore = await cookies();

        cookieStore.set("userId", (String(userId)), { secure: true })
    } catch {
        throw new Error("Al crear cookie")
    } finally {
        alert("cookie creada")
    }
}