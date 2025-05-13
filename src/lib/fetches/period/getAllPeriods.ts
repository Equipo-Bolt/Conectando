import { prisma } from "@/lib/prisma";
import { TypePeriod } from "@/types/TypePeriod";

export async function getAllPeriods() {
    try {
        const periods = await prisma.period.findMany({
            where: { deactived : false }
        });

        if (periods.length === 0) {
            throw new Error ("There are no periods")
        }

        return periods as TypePeriod[];
    } catch(error) {
        throw new Error(`Error: ${(error as Error).message}`);
    }
}