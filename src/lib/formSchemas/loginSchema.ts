"use client";

import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "El email es requerido").email("El email no es válido"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;