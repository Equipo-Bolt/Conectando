import {
  addGradeToObjectiveSchema,
  addResultToObjectiveSchema,
  updateObjectiveSchema,
} from "@/lib/formSchemas/objectiveSchema";

import { ZodType } from "zod";
import { UpdateObjectiveFormData } from "@/types/Objective";

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
