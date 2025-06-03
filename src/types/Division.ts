import { z } from "zod";
import { createCatalogSchema } from "@/lib/formSchemas/catalogSchema";

export interface Division {
  id: number;
  title: string;
  createdAt: string;
}

export type CreateDivisionFormData = z.infer<typeof createCatalogSchema>;