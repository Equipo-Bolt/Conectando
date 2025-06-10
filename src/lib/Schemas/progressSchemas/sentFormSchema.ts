"use client";

import { z } from "zod";

import { validSentObjectiveSchema } from "@/lib/Schemas/formSchemas/objectiveSchema";

import { draftFormClassifications } from "@/lib/Schemas/progressSchemas/draftFormSchema";
import { addProgressFormValidation } from "@/utils/ObjectiveFormUtils/addProgressFormValidation";

export const sentFormClassifications = draftFormClassifications.extend({
  objectives: z.array(validSentObjectiveSchema),
});

export const sentFormSchema = addProgressFormValidation(sentFormClassifications);