"use client";

import { z } from "zod";

export const objectiveSchema = z.object({
    title: z.string().min(1, "El título del objetivo es requerido"),
    weight: z.number().min(1, "El peso es requerido").max(100, "El peso no puede ser mayor a 100"),
    classification: z.object({
        id: z.number().min(1, "Seleccione una clasificación"),
        weight: z.number().min(1, "El peso es requerido").max(100, "El peso no puede ser mayor a 100"),
    }),
    goal: z.string().nullable(),
}).refine((data) => {
    const weight = data.weight;
    return weight >= 0 && weight <= 100;
}
, {
    message: "El peso debe estar entre 0 y 100",
})