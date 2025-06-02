import { z } from "zod";
import { otpSchema } from "@/lib/formSchemas/otpSchema"

export type OtpSchemaType = z.infer<typeof otpSchema>