import { createBusinessUnitSchema } from "@/lib/formSchemas/catalogSchema";
import { z } from "zod";

export interface BusinessUnit {
  id: number;
  title: string;
  divisionID: number;
}

export type CreateBusinessUnitFormData = z.infer<typeof createBusinessUnitSchema>