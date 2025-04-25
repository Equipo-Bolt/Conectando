import { prisma } from "@/lib/prisma";
import { TypeForm } from "@/types/TypeForm";

export async function getFormById( formId : number ) {
    try {
        const form = await prisma.form.findUnique({
            where: { deactived : false, id : formId }
        })

        if (!form) {
            throw new Error("Form does not exist")
        }

        return form as TypeForm;
    } catch(err) {
        throw new Error(`Error: ${ (err as Error).message }`)
    }
}