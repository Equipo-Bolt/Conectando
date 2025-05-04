"use server";

import { prisma } from "@/lib/prisma";

/**
 * Updates the progress status of a form instance.
 * @param formId - ID of the form to update.
 * @param newProgressId - ID of the target progress status.
 * @returns A success message or throws an error.
 */
export async function updateFormProgress(
    formId: number,
    newProgressId: number
) {
    if (!formId) {
        throw new Error("No id given to form");
    }

    if (!newProgressId) {
        throw new Error("No id given to progress");
    }

    try {
        const form = await prisma.form.findUnique({ where: { id: formId } });

        if (!form) {
            throw new Error("Form not found");
        }

        const targetProgress = await prisma.progress.findUnique({
          where: { id: newProgressId },
          select: { title: true },
        });  

        if (!targetProgress) {
          throw new Error("Progress not found");
        }

        // Create Form Instance
        const updateFormData: any = { progressID: newProgressId }

        // Business-Logic Validations
        if (form.progressID >= newProgressId) {
            throw new Error("Invalid progress state: The current form progress is more avanced than the new progress");
        }

        if (targetProgress?.title === "Aprobado") {
            updateFormData.approvedAt = new Date();
        }

        if (targetProgress?.title === "Calificado") {
          updateFormData.gradedAt = new Date();
        }
        
        await prisma.form.update({
            where: { id: formId },
            data: { progressID: newProgressId },
        });

        return "Form progress updated successfully";
    } catch {
        throw new Error("Failed to update form");
    }
}
