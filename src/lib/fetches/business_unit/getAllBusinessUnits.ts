import { prisma } from "@/lib/prisma";
import { BusinessUnit } from "@/types/BusinessUnit";

/**
 * * getAllBusinessUnits() gets all created and not deactivated business units
 *
 * @returns Promise of type {@link BusinessUnit}[]
 */

export async function getAllBusinessUnits() {
    try {
        const businessUnits = await prisma.businessUnit.findMany({
            where: { deactivated : false }
        });

        if (businessUnits.length === 0) {
            throw new Error("No hay Unidades de Negocio")
        }

        return businessUnits.map(({ deactivated, updatedAt, ...bu }) => ({
            ...bu,
            createdAt: bu.createdAt.toISOString()
        })) as BusinessUnit[];
    } catch(error) {
        console.error(`Error fetching business units: ${(error as Error).message}`);
        return ([] as BusinessUnit[]);
    }
}