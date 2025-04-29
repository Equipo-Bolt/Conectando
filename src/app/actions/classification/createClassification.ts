import { prisma } from '@/lib/prisma';

export async function createClassificationAction(data : FormData) {
    const newTitle = data.get("title") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new classification");
    }

    try {
        const classificationsExists = await prisma.classification.findUnique({
            where: { 
                title : newTitle 
            }
        });
    
        if (classificationsExists) {
            throw new Error ("Classification with same title already exists");
        }

        await prisma.classification.create({
            data: {
                title: newTitle
            }
        });

        return "Classification created";
    } catch {
        throw new Error ("Failed to create classification");
    }
}