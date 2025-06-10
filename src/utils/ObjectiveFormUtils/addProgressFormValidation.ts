// lib/Schemas/utils/formValidation.ts
import { z } from "zod";

export function addProgresssFormValidation(baseSchema: z.ZodTypeAny) {
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

        // Optional check for sent schema
        if ('comments' in objective && !objective.comments) { //! WHEN SENT
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El objetivo "${objective.title}" no tiene un comentario, debe tener al menos uno`,
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