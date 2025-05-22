import { getFormsOfUser } from "./getFormsOfUser";
import { getCurrentPeriod } from "../period/getCurrentPeriod";
import { Form } from "@/types/Form";

/**
 * * getFormIdByUserId gets the form id given a user id

 * @param userId The id of the user to find their current form 
 * @returns id of the form as string, cuz consistency (because it could also send "Sin Formulario Activo")
 */
export async function getFormIdByUserId( userId : number ) {
    try {
        const forms = await getFormsOfUser(userId) as Form[];

        if (forms.length === 0) {
            return ("Sin Formulario Activo");
        }

        const currentPeriod = await getCurrentPeriod();
        if(!currentPeriod.startsAt){
            return ("Sin Formulario Activo");
        }

        const currentForm = forms.find(form => 
            form.createdAt >= currentPeriod.startsAt && form.createdAt <= currentPeriod.endsAt
        );

        if (!currentForm) {
            return ("Sin Formulario Activo");
        }

        return String(currentForm.id);
    } catch(error) {
        console.error(`Error fetching form: ${(error as Error).message}`);
        return ("Sin Formulario Activo");
    }
}