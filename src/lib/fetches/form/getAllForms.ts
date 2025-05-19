import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

export async function getAllForms() {
    try {
        const forms = await prisma.form.findMany({
            where: { deactived : false }
        })

        if (forms.length === 0) {
            throw new Error("There are no forms.")
        }

        return forms.map( ( { deactived, updatedAt, ...f} ) => f ) as Form[];
    } catch(err) {
        throw new Error(`Error: ${ (err as Error).message }`)
    }
}