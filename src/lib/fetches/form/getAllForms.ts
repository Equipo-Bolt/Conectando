import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

/**
 * * getAllForms() gets all created and not deactivated forms
 *
 * @returns Promise of type {@link Form}[]
 */

export async function getAllForms() {
    try {
        const forms = await prisma.form.findMany({
            where: { deactivated : false }
        })

        if (forms.length === 0) {
            throw new Error("No hay formularios")
        }

        return forms.map( ( { deactivated, updatedAt, ...f} ) => f ) as Form[];
    } catch(error) {
        console.error(`Error fetching forms: ${(error as Error).message}`);
        return ([] as Form[]);
    }
}