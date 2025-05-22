"use client"; 

import { z } from "zod"

export const otpSchema = z.object({
    pin: z.string().min(6, {
        message: "El código debe de ser de 6 caracteres.",
    }).length(6, {
        message: "El código debe de ser de 6 caracteres.",
    }).regex(/^\d+$/, {
        message: "El código debe de contener solo números.",
    }),
})

export type OtpSchemaType = z.infer<typeof otpSchema>