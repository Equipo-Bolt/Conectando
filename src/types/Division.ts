import { z } from "zod";
import { createCatalogSchema, updateCatalogSchema } from "@/lib/Schemas/formSchemas/catalogSchema";

export interface Division {
  id: number;
  title: string;
  createdAt: string;
}

export type CreateDivisionFormData = z.infer<typeof createCatalogSchema>;
export type UpdateDivisionFormData = z.infer<typeof updateCatalogSchema>;