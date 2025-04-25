"use server";

import { prisma } from '@/lib/prisma';

export async function updateBusinessUnitAction(businessUnitId : number, data : FormData) {
    if (!businessUnitId){
        throw new Error ("No id given to business unit");
    }

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
        const businessUnitExists = await prisma.businessUnit.findUnique({
            where: { 
                NOT: {
                    id: businessUnitId
                },
                title : newTitle 
            },
            include: {
                division:  true
            }
        });
        if (businessUnitExists && businessUnitExists?.division.id === divisionId) {
            throw new Error ("Business Unit with same data already exists");
        }

        await prisma.businessUnit.update({
            where: { id : businessUnitId },
            data: { 
                title: newTitle,
                division: {
                    connect: {
                        id: divisionId
                    }
                }
            }
        });

        return "Business Unit has been updated";
    } catch {
        throw new Error ("Failed to update business unit")
    }
}