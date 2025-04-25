"use server";

import { prisma } from '@/lib/prisma';

export async function createBusinessUnitAction(data : FormData) {
    const newTitle = data.get("title") as string | null;
    const rawDivisionId = data.get("divisionID") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new business unit");
    }
    if (!rawDivisionId) {
        throw new Error("No division id given to new business unit");
    }

    const divisionId = Number(rawDivisionId);
    if (Number.isNaN(divisionId)) {
        throw new Error("Division id is invalid");
    }

    try {
        const divisionExists = await prisma.division.findUnique({
            where: {
                id: divisionId
            }
        });
        if (!divisionExists) {
            throw new Error("Division is not found");
        }

        const businessUnitExists = await prisma.businessUnit.findUnique({
            where:{
                title : newTitle
            }
        });
        if (businessUnitExists) {
            throw new Error("Business unit with same title already exists");
        }

        await prisma.businessUnit.create({
            data: {
                title: newTitle,
                division: {
                    connect: {
                        id: divisionId
                    }
                }
            }
        });

        return "Business unit created";
    } catch {
        throw new Error("Failed to create business unit");
    }
}