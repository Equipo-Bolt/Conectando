import { prisma } from '@/lib/prisma';

export async function createBusinessUnitAction(data : FormData) {
    const newTitle = data.get("title") as string | null;
    const divisionTitle = data.get("division") as string | null;

    if (!newTitle) {
        throw new Error("No title given to new business unit");
    }

    if (!divisionTitle) {
        throw new Error("No division given to new business unit");
    }

    const divisionExists = await prisma.division.findUnique({
        where:{title : divisionTitle}
    })

    if (!divisionExists) {
        throw new Error ("Division does exist to link to area")
    }

    try {
        await prisma.businessUnit.create({
            data: {
                title: newTitle,
                division: {
                    connect: {
                        title: divisionTitle
                    }
                }
            }
        })

        return "Business Unit created";
    } catch (error) {
        throw new Error ("Failed to create business unit")
    }
}