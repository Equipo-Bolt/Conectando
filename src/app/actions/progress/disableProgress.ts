"use server";

import { prisma } from "@/lib/prisma";

export async function disableProgress(progressId: number) {
    if (!progressId) {
        throw new Error ("No id given to disable progress")
    }

    try {
        await prisma.progress.update({
            where: { id: progressId },
            data: { deactived: true },
        });
        
        return "Progress has been disabled";
    } catch {
        throw new Error("Failed to disable progress");
    }
}
