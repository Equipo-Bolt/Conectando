import { prisma } from "@/lib/prisma";

export async function createProgress(data: FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new progress");
    }

    try {
        const progressExists = await prisma.progress.findUnique({
            where: { 
                title : newTitle,
            }
        })
    
        if (progressExists) {
            throw new Error ("Progress with same title already exists");
        }

        await prisma.progress.create({
            data: {
                title: newTitle
            }
        })

        return "Progress created";
    } catch {
        throw new Error("Failed to create progress");
    }
}
