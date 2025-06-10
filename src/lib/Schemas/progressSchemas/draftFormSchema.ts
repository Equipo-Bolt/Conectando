"use client";

import { z } from "zod";

import { validDraftObjectiveSchema } from "@/lib/Schemas/formSchemas/objectiveSchema";
import { addProgresssFormValidation } from "@/utils/ObjectiveFormUtils/addProgressFormValidation";

export const draftFormClassifications = z.object({
  weight: z.number().min(0).max(100),
  classificationTitle: z.string().min(1),
  objectiveClassificationID: z.number().nullable(),
  objectives: z.array(validDraftObjectiveSchema)
})

export const draftFormSchema = addProgresssFormValidation(draftFormClassifications);