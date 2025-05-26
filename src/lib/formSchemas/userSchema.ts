"use client";

import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido"),
    roleID: z.string().min(1, "El rol es requerido"),
});