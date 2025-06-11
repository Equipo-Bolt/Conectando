import {
  addGradeToObjectiveSchema,
  addResultToObjectiveSchema,
  updateObjectiveSchema,
} from "@/lib/Schemas/formSchemas/objectiveSchema";

import { ZodType } from "zod";
import { UpdateObjectiveFormData } from "@/types/Objective";

/**
 * @description Returns the appropriate Zod schema based on the provided progress state.
 * This function maps different progress states to their corresponding Zod schemas
 * for validating or updating objective form data.
 *
 * @param progress - The current progress state of the objective.
 *                   Possible values are "Borrador", "Enviado", "Aprobado", and "Calificado".
 * @returns A Zod schema (`ZodType<UpdateObjectiveFormData>`) corresponding to the given progress state.
 *          - "Borrador" and "Enviado" return `updateObjectiveSchema`.
 *          - "Aprobado" returns `addResultToObjectiveSchema`.
 *          - "Calificado" returns `addGradeToObjectiveSchema`.
 *          - Any other value defaults to `updateObjectiveSchema`.
 */
export const ObjectiveSchemaSelectionCol = (
  progress: string
): ZodType<UpdateObjectiveFormData> => {
  switch (progress) {
    case "Borrador":
      return updateObjectiveSchema;
    case "Enviado":
      return updateObjectiveSchema;
    case "Aprobado":
      return addResultToObjectiveSchema;
    case "Calificado":
      return addGradeToObjectiveSchema;
    default:
      return updateObjectiveSchema;
  }
};
