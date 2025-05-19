import { prisma } from "@/lib/prisma";
import { Period } from "@/types/Period";

export async function getAllPeriods() {
    try {
        const periods = await prisma.period.findMany({
            where: { deactived : false }
        });

        if (periods.length === 0) {
            throw new Error ("There are no periods")
        }

        return periods as Period[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}