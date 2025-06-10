"use client";

import { z } from "zod";

import { validAprovedObjectiveSchema } from "@/lib/Schemas/formSchemas/objectiveSchema";

import { sentFormClassifications } from "./sentFormSchema";
import { addProgresssFormValidation } from "@/utils/ObjectiveFormUtils/addProgressFormValidation";

export const approvedFormClassifications = sentFormClassifications.extend({
  objectives: z.array(validAprovedObjectiveSchema),
});

export const approvedFormSchema = addProgresssFormValidation(approvedFormClassifications);