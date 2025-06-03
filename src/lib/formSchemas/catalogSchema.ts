"use client";

import { z } from "zod";

export const createCatalogSchema = z.object({
    title: z.string().min(1, "El título es requerido").max(100, "El título es demasiado largo"),
});

export const createBusinessUnitSchema = createCatalogSchema.extend({
    divisionId: z.number()
});