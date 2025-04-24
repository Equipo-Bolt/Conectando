import { prisma } from '@/lib/prisma';

export async function disableBusinessUnitAction(businessUnitId : number) {
    if (!businessUnitId){
        throw new Error ("No id given to disable business unit");
    }

    try {
        await prisma.businessUnit.update({
            where: { id : businessUnitId },
            data: { deactived : true }
        })

        return "Business Unit has been disabled";
    } catch {
        throw new Error ("Failed to disable business unit")
    }
}