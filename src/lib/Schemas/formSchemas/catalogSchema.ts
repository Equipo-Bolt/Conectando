"use client";

import { z } from "zod";

export const createCatalogSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(36, "El título es demasiado largo"),
});

export const createBusinessUnitSchema = createCatalogSchema.extend({
  divisionId: z
    .string()
    .min(1, "La división es requerida")
    .refine(
      (val) => {
        const divisionId = parseInt(val, 10);
        return !isNaN(divisionId) && divisionId > 0;
      },
      {
        message: "La división debe ser un número positivo",
      }
    ),
});
export const updateCatalogSchema = createCatalogSchema.extend({
  id: z.number(),
});
export const updateBusinessUnitSchema = createBusinessUnitSchema.extend({
  id: z.number(),
});
