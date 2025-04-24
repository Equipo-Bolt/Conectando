import { prisma } from "@/lib/prisma";

export async function updateProgress(progressId: number, data: FormData) {
    if (!progressId) {
        throw new Error("No id given to progress");
    }

    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to progress");
    }

    try {
        const progressExists = await prisma.progress.findUnique({
            where: { 
                NOT : {
                    id: progressId
                },
                title : newTitle,
            }
        })
    
        if (progressExists) {
            throw new Error("Progress with same title already exists");
        }

        await prisma.progress.update({
            where: { id: progressId },
            data: { title: newTitle }
        });

        return "Progress has been updated";
    } catch {
        throw new Error("Failed to update progress");
    }
}
