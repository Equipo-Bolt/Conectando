import { prisma } from "@/lib/prisma";
import { TypeForm } from "@/types/TypeForm";

export async function getFormsOfUser( userId : number ) {
    try {
        const forms = await prisma.form.findMany({
            where: { deactived : false, collaboratorID : userId }
        })

        if (forms.length === 0) {
            return forms; //! REGRESARLO VACIO POR CONSITENCIA
        }

        return forms.map( ( { deactived, updatedAt, ...f} ) => f ) as TypeForm[];
    } catch(err) {
        throw new Error(`Error: ${ (err as Error).message }`)
    }
}