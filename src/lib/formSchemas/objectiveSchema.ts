"use client";

import { z } from "zod";

export const createObjectiveSchema = z.object({
  formID: z.number().optional(),
  title: z
    .string()
    .min(1, "El título del objetivo es requerido")
    .max(60, "El título excede el largo permitdo"),
  weight: z
    .string()
    .min(1, "El peso es requerido")
    .max(3, "El peso no puede ser mayor a 100")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 100;
      },
      {
        message: "El peso debe estar entre 1 y 100",
      }
    ),
  classification: z.string().min(1, "La clasificación es requerida"),
  goal: z.string().max(511, "La meta excede el largo permitido").nullable(),
  result: z.string().nullable(),
});

export const updateObjectiveSchema = createObjectiveSchema.extend({
  id: z.number(),
  grade: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === "") {
        return undefined;
      }
      return val;
    })
    .refine(
      (val) => {
        if (val === undefined) {
          return true;
        }
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 5;
      },
      {
        message: "La calificación debe estar entre 1 y 5",
      }
    ),
});
export const addGoalToObjectiveSchema = updateObjectiveSchema.extend({
  goal: z
    .string()
    .min(1, "La meta es requerida")
    .max(511, "La meta excede el largo permitido"),
});

export const addResultToObjectiveSchema = updateObjectiveSchema.extend({
  id: z.number(),
  result: z
    .string()
    .min(1, "El resultado es requerido")
    .max(511, "El resultado excede el largo permitido"),
});
export const addGradeToObjectiveSchema = addResultToObjectiveSchema.extend({
  grade: z
    .string()
    .optional()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 5;
      },
      {
        message: "La calificación debe estar entre 1 y 5",
      }
    ),
});

export const validObjectiveSchema = createObjectiveSchema
  .omit({ classification: true })
  .extend({
    weight: z.number().min(0).max(100, "El peso debe estar entre 0 y 100"),
  });
