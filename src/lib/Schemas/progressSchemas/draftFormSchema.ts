"use client";

import { z } from "zod";

import { validDraftObjectiveSchema } from "@/lib/Schemas/formSchemas/objectiveSchema";
import { addProgressFormValidation } from "@/utils/ObjectiveFormUtils/addProgressFormValidation";

export const draftFormClassifications = z.object({
  weight: z.number().min(0).max(100),
  classificationTitle: z.string().min(1),
  objectiveClassificationID: z.number().nullable(),
  objectives: z.array(validDraftObjectiveSchema)
})
//? maybe replace Schema wording to validator?
export const draftFormSchema = addProgressFormValidation(draftFormClassifications);