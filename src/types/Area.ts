import { z } from "zod";
import { createCatalogSchema } from "@/lib/formSchemas/catalogSchema";

export interface Area {
  id: number;
  title: string;
}

export type CreateAreaFormData = z.infer<typeof createCatalogSchema>;