"use client";

import { z } from "zod";

import { createObjectiveSchema } from "./objectiveSchema";

export const validObjectivesSchema = z.array(z.object({
  weight: z.number().min(0).max(100),
  classificationTitle: z.string().min(1),
  objectiveClassificationID: z.number().nullable(),
  objectives: z.array(createObjectiveSchema)
})).superRefine((classifications, ctx) => {
  // Check if there's at least one objective per classification type
  const classificationGroups = new Map<string, number>();
  
  // Count objectives per classification
  for (const classification of classifications) {
    const { classificationTitle, objectives } = classification;
    // Check if this classification has any objectives
    if (objectives.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No hay objetivos para la clasificación ${classificationTitle}`,
      });
    }
    
    // Track classification titles for weight validation later
    if (!classificationGroups.has(classificationTitle)) {
      classificationGroups.set(classificationTitle, 1);
    }
  }
  
  // Get unique classification titles
  const uniqueClassificationTitles = Array.from(classificationGroups.keys());
  
  // Check if the sum of objective weights within each classification is 100
  for (const classificationTitle of uniqueClassificationTitles) {
    const relevantClassifications = classifications.filter(
      c => c.classificationTitle === classificationTitle
    );
    
    // Calculate the total weight of objectives for this classification
    let objectivesWeightSum = 0;
    for (const classification of relevantClassifications) {
      for (const objective of classification.objectives) {
        objectivesWeightSum += objective.weight;
      }
    }
    
    // Validate that the sum equals 100
    if (objectivesWeightSum !== 100 && relevantClassifications.some(c => c.objectives.length > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `El peso de los objetivos para la clasificación ${classificationTitle} no suma 100%`,
      });
    }
  }
  
  // Check if the sum of all classification weights is 100
  const classificationWeightMap = new Map<string, number>();
  
  // First, sum the weights for each unique classification title
  for (const classification of classifications) {
    const { classificationTitle, weight } = classification;
    const currentWeight = classificationWeightMap.get(classificationTitle) || 0;
    classificationWeightMap.set(classificationTitle, currentWeight + weight);
  }
  
  // Sum all the classification weights
  const totalClassificationWeight = Array.from(classificationWeightMap.values())
    .reduce((acc, weight) => acc + weight, 0);
  
  // Validate that the total equals 100
  if (totalClassificationWeight !== 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La suma de los pesos de las clasificaciones no es 100%",
    });
  }
});

export type ValidObjectivesSchemaType = z.infer<typeof validObjectivesSchema>;