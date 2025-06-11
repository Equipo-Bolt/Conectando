import { loginSchema } from "@/lib/Schemas/formSchemas/loginSchema";
import z from "zod";
export type Login =  z.infer<typeof loginSchema>;