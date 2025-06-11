import { createBusinessUnitSchema, updateBusinessUnitSchema } from "@/lib/Schemas/formSchemas/catalogSchema";
import { z } from "zod";

export interface BusinessUnit {
  id: number;
  title: string;
  divisionID: number;
}

export type CreateBusinessUnitFormData = z.infer<typeof createBusinessUnitSchema>
export type UpdateBusinessUnitFormData = z.infer<typeof updateBusinessUnitSchema>;