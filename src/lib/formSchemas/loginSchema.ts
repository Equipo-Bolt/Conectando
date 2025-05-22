import { z } from "zod";

//! For login page, subject to changes
export const loginSchema = z.object({
  email: z.string({ required_error: "Email es requerido" })
    .min(1, "Email es requerido")
    .email("Email no es válido")
});