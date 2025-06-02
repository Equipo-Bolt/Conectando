import { prisma } from "@/lib/prisma";
import { BusinessUnit } from "@/types/BusinessUnit";

/**
 * * getBusinessUnitById() gets a business unit by its id
 * 
 * @param businessUnitId<number> id of the business unit to search
 * @returns Promise of type {@link BusinessUnit}
 */

export async function getBusinessUnitById(businessUnitId : number) {
    try {
        const businessUnit = await prisma.businessUnit.findUnique({
            where: { id : businessUnitId },
            select: {
                id: true,
                title: true,
                createdAt: true,
                division: true
            }
        })

        if (!businessUnit) {
            throw new Error ("La Unidad de Negocio no existe");
        }

        return {
            ...businessUnit,
            createdAt: businessUnit.createdAt.toISOString(),
            divisionID: businessUnit.division.id,
            division: businessUnit.division.title
        } as BusinessUnit;
    } catch(error) {
        console.error(`Error fetching business unit: ${(error as Error).message}`);
        return({} as BusinessUnit);
    }
}