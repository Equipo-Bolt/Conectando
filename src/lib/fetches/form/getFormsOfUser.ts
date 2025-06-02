import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

/**
 * * getFormsOfUser() gets all forms associated with the userId provided
 * 
 * @param userId<number> id of the user to search for forms
 * @returns Promise of type {@link Form}[]
 */

export async function getFormsOfUser( userId : number ) {
    try {
        const forms = await prisma.form.findMany({
            where: { deactivated : false, collaboratorID : userId }
        })

        if (forms.length === 0) {
            return ([] as Form[]); //! REGRESARLO VACIO POR CONSITENCIA
        }

        return forms.map( ( { deactivated, updatedAt, ...f} ) => f ) as Form[];
    } catch(error) {
        console.error(`Error fetching form: ${(error as Error).message}`);
        return ([] as Form[]);
    }
}