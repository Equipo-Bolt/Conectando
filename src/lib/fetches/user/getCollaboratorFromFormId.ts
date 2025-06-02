import { prisma } from "@/lib/prisma";
import { User } from "@/types/User";

/**
 * * getCollaboratorFromFormId() Fetches a User to display in details page
 * 
 * @param formId<number> id of the form of the use (its included in Objective data)
 * @returns Promise of type {@link User}
 */

export async function getCollaboratorFromFormId(formId : number) {
    try {
        const form = await prisma.form.findUnique({
            where: { id : formId, deactivated : false },
            include: { collaborator : true}
        });

        if (!form) {
            throw new Error("El Formulario no existe");
        }
        
        const collaborator = form.collaborator;

        const { deactivated, updatedAt, ...cleanUser } = collaborator;

        return { ...cleanUser } as User;
    
    } catch(error) {
        console.error(`Error fetching user: ${(error as Error).message}`);
        return ({} as User);
    }
}