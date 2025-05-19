"use server"
 
import { cookies } from "next/headers";

/**
 * * setUserIdAction creates a cookie that saves userId, used in development
 * @param userId<int> id del usuario a guardar
 */ 
export async function setUserIdAction(userId : number) {
    try {
        const cookieStore = await cookies();

        cookieStore.set("userId", (String(userId)), { secure: true })
    } catch(err) {
        console.log(`Error when creating cookie: ${(err as Error).message}`)
    }
}