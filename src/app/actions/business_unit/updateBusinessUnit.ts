import { prisma } from '@/lib/prisma';

export async function updateBusinessUnitAction(businessUnitId : number, data : FormData) {
    if (!businessUnitId){
        throw new Error ("No id given to disable business unit");
    }

    const newTitle = data.get("title") as string | null;
    const divisionTitle = data.get("division") as string | null;

    if (!newTitle) {
        throw new Error ("No title given to business unit");
    }
    if (!divisionTitle) {
        throw new Error ("No division title given to link business unit");
    }

    const businessUnitExists = await prisma.businessUnit.findUnique({
        where: { title : newTitle },
        include: {
            division:  true
        }
    })

    if (businessUnitExists && businessUnitExists?.division.title === divisionTitle) {
        throw new Error ("Business Unit with same data already exists")
    }

    try {
        await prisma.businessUnit.update({
            where: { id : businessUnitId },
            data: { 
                title: newTitle,
                division: {
                    connect: {
                        title: divisionTitle
                    }
                }
            }
        })

        return "Business Unit has been updated";
    } catch (error) {
        throw new Error ("Failed to update business unit")
    }
}