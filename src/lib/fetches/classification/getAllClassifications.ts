

import { prisma } from "@/lib/prisma";

import { TypeClassification } from "@/types/TypeClassification";

export async function getAllClassifications() {
    try {
        const classifications = await prisma.classification.findMany({
            where: { deactived : false }
        });

        if (classifications.length === 0) {
            throw new Error ("No hay clasificaciones en los catalogos, checa tu db")
        }

        return classifications.map(({ deactived, updatedAt, ...c }) => ({
            ...c,
            createdAt: c.createdAt.toISOString()
        })) as TypeClassification[];
    } catch(error) {
        throw new Error(`Error al cargar las clasificaiones del catalogo: ${(error as Error).message}`);
    }
}