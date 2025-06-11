"use client"; 

import { z } from "zod"

export const otpSchema = z.object({
    email: z.string().min(1, {
        message: "El email es requerido",
    }).email("El email no es válido"),

    otp: z.string().min(6, {
        message: "El código debe de ser de 6 caracteres.",
    }).length(6, {
        message: "El código debe de ser de 6 caracteres.",
    }).regex(/^\d+$/, {
        message: "El código debe de contener solo números.",
    }),
})