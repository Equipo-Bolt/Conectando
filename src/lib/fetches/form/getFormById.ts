import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

export async function getFormById( formId : number ) {
    try {
        const form = await prisma.form.findUnique({
            where: { deactived : false, id : formId }
        })

        if (!form) {
            throw new Error("Form does not exist")
        }

        return form as Form;
    } catch(error) {
        throw new Error(`Error: ${ (error as Error).message }`)
    }
}