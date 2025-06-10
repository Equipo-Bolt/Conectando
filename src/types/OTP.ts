import { z } from "zod";
import { otpSchema } from "@/lib/Schemas/formSchemas/otpSchema"

export type OtpSchemaType = z.infer<typeof otpSchema>