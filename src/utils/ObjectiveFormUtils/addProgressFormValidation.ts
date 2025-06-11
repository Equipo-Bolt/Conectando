// lib/Schemas/utils/formValidation.ts
import { z } from "zod";
/**
 * @description Applies custom validation logic to a Zod schema representing an array of classification objects.
 * This function enforces business logic rules such as:
 * - Borrador and forward:
 * - - Each classification must include at least one objective.
 * - - Each objective must have a non-empty goal.
 * - - The sum of objective weights within each classification title must be exactly 100.
 * - - The total weight across all classifications must also sum to 100.
 * - Enviado and forward:
 * - - Objectives must include a `comments` field and it must not be empty.
 * - Aproved:
 * - - ALL Objectives must be graded.
 * - - ALL Objectives must have result field completed.
 *
 * ! This utility function allowed to NOT have a bunch of duped code. I basically check if the Objective type that is being received has
 * ! 'main' values that are needed for validation.
 *
 * @param baseSchema - A Zod object schema defining the structure of a single classification.
 *                     Must include a `classificationTitle`, `weight`, and an `objectives` array.
 * @returns A Zod array schema with integrated `superRefine` custom validations applied to the provided base schema.
 */

export function addProgressFormValidation(baseSchema: z.ZodTypeAny) {
  return z.array(baseSchema).superRefine((formClassifications, ctx) => {
    const classificationGroups = new Map<string, number>();

    for (const classification of formClassifications) {
      const { classificationTitle, objectives } = classification;

      if (objectives.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `No hay objetivos para la clasificación ${classificationTitle}`,
        });
      }

      for (const objective of objectives) {
        if (!objective.goal || objective.goal.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El objetivo "${objective.title}" no tiene una meta definida.`,
          });
        }

        if ('comments' in objective && objective.comments.length === 0) { //! WHEN SENT
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El objetivo "${objective.title}" no tiene un comentario. Debe tener al menos uno.`,
          });
        }

        if ('result' in objective && !objective.result) {//! WHEN APPROVED
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El objetivo "${objective.title}" no tiene un resultado.`,
          });
        }

        if ('grade' in objective && !objective.grade) {//! WHEN APPROVED
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El objetivo "${objective.title}" no tiene una calificación.`,
          });
        }
      }

      if (!classificationGroups.has(classificationTitle)) {
        classificationGroups.set(classificationTitle, 1);
      }
    }

    const uniqueClassificationTitles = Array.from(classificationGroups.keys());

    for (const classificationTitle of uniqueClassificationTitles) {
      const relevantClassifications = formClassifications.filter(
        c => c.classificationTitle === classificationTitle
      );

      let objectivesWeightSum = 0;
      for (const classification of relevantClassifications) {
        for (const objective of classification.objectives) {
          objectivesWeightSum += objective.weight;
        }
      }

      if (objectivesWeightSum !== 100 && relevantClassifications.some(c => c.objectives.length > 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `El peso de los objetivos para la clasificación ${classificationTitle} no suma 100%`,
        });
      }
    }

    const classificationWeightMap = new Map<string, number>();
    for (const classification of formClassifications) {
      const { classificationTitle, weight } = classification;
      const currentWeight = classificationWeightMap.get(classificationTitle) || 0;
      classificationWeightMap.set(classificationTitle, currentWeight + weight);
    }

    const totalClassificationWeight = Array.from(classificationWeightMap.values())
      .reduce((acc, weight) => acc + weight, 0);

    if (totalClassificationWeight !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La suma de los pesos de las clasificaciones no es 100%",
      });
    }
  });
}