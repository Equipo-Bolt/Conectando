import { z } from "zod";
import { createCatalogSchema, updateCatalogSchema } from "@/lib/Schemas/formSchemas/catalogSchema";

export interface Area {
  id: number;
  title: string;
}

export type CreateAreaFormData = z.infer<typeof createCatalogSchema>;
export type UpdateAreaFormData = z.infer<typeof updateCatalogSchema>;