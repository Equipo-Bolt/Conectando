"use client";

import { z } from "zod";

export const createObjectiveSchema = z.object({
  title: z.string().min(1, "El título del objetivo es requerido"),
  weight: z
    .string()
    .min(1, "El peso es requerido")
    .max(3, "El peso no puede ser mayor a 100")
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, {
      message: "El peso debe estar entre 0 y 100",
    }),
  classification: z.string().min(1, "Seleccione una clasificación"),
  goal: z.string().nullable(),
});

export const updateObjectiveSchema = createObjectiveSchema.extend({
  id: z.number(),
});
