import { prisma } from '@/lib/prisma';

export async function disablePeriodAction(periodId : number) {
    if (!periodId){
        throw new Error ("No id given to disable period");
    }

    try {
        await prisma.period.update({
            where: { id : periodId },
            data: { deactived : true }
        })

        return "Period has been disabled";
    } catch (error) {
        throw new Error ("Failed to disable period")
    }
}