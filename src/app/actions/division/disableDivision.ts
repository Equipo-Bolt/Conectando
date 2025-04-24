import { prisma } from '@/lib/prisma';

export async function disableDivisionAction(divisionId : number) {
    if (!divisionId){
        throw new Error ("No id given to disable classification");
    }

    try {
        await prisma.classification.update({
            where: { id : divisionId },
            data: { deactived : true }
        })

        return "Classification has been disabled";
    } catch {
        throw new Error ("Failed to disable classification")
    }
}