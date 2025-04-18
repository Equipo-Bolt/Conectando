import { prisma } from '@/lib/prisma';

export async function createClassificationAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new classification");
    }

    try {
        await prisma.classification.create({
            data: {
                title: newTitle
            }
        })

        return "Classification created";
    } catch (error) {
        throw new Error ("Failed to create classification")
    }
}