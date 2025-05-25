import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

/**
 * * getFormById() gets a form by its id
 * 
 * @param formId<number> id of the form to search
 * @returns Promise of type {@link Form}
 */

export async function getFormById( formId : number ) {
    try {
        const form = await prisma.form.findUnique({
            where: { deactivated : false, id : formId }
        })

        if (!form) {
            throw new Error("El Formulario no existe")
        }

        return form as Form;
    } catch(error) {
        console.error(`Error fetching form: ${(error as Error).message}`);
        return ({} as Form);
    }
}