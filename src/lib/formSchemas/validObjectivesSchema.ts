"use client";

import { z } from "zod";

import { createObjectiveSchema } from "@/lib/formSchemas/createObjectiveSchema";

export const validObjectivesSchema = (classifications: { id: string }[]) => z.array(createObjectiveSchema).superRefine(
    (objectives, ctx) => {
        //* Checamos si existe por lo menos un objetivo por categoría
        const classificationIds = classifications.map((classification) => classification.id);
        const classificationCount = new Map<string, number>();

        for (const classificationId of classificationIds) {
            classificationCount.set(classificationId.toString(), 0);
        }

        for (const objective of objectives) {
            const classificationId = objective.classification;
            if (classificationCount.has(classificationId)) {
                classificationCount.set(classificationId, classificationCount.get(classificationId)! + 1);
            }
        }

        for (const [classificationId, count] of classificationCount.entries()) {
            if (count === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `No hay objetivos para la clasificación ${classificationId}`,
                });
            }
        }

        //* Checamos si el peso de los objetivos por cateogoría es 100
        const totalWeight = new Map<string, number>();

        for (const classificationId of classificationIds) {
            totalWeight.set(classificationId.toString(), 0);
        }

        for (const objective of objectives) {
            const classificationId = objective.classification;
            const weight = parseInt(objective.weight, 10);
            if (totalWeight.has(classificationId)) {
                totalWeight.set(classificationId, totalWeight.get(classificationId)! + weight);
            }
        }

        for (const [classificationId, weight] of totalWeight.entries()) {
            if (weight !== 100) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El peso de los objetivos para la clasificación ${classificationId} no es 100`,
                });
            }
        }

        //* Checamos si la suma de todos los pesos es 100
        const totalWeightAll = objectives.reduce((acc, objective) => {
            const weight = parseInt(objective.weight, 10);
            return acc + weight;
        }, 0);

        if (totalWeightAll !== 100) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La suma de todos los pesos debe de ser 100",
            });
        }
    }
);