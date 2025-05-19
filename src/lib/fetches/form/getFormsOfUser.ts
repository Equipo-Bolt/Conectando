import { prisma } from "@/lib/prisma";
import { Form } from "@/types/Form";

export async function getFormsOfUser( userId : number ) {
    try {
        const forms = await prisma.form.findMany({
            where: { deactived : false, collaboratorID : userId }
        })

        if (forms.length === 0) {
            return forms; //! REGRESARLO VACIO POR CONSITENCIA
        }

        return forms.map( ( { deactived, updatedAt, ...f} ) => f ) as Form[];
    } catch(error) {
        throw new Error(`Error: ${ (error as Error).message }`)
    }
}