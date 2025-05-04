import { getFormsOfUser } from "./getFormsOfUser";
import { getCurrentPeriod } from "../period/getCurrentPeriod";
import { TypeForm } from "@/types/TypeForm";

/**
 * * getFormIdByUserId
 * its name could change to be more understable

 * @param userId The id of the user to find their current form 
 * @returns id of the form as string, cuz consistency (because it could also send "Nothing found")
 */
export async function getFormIdByUserId( userId : number ) {
    try {
        const forms = await getFormsOfUser(userId) as TypeForm[];

        if (forms.length === 0) {
            return "Sin Formulario Activo"; //! change
        }

        const currentPeriod = await getCurrentPeriod();
        if(!currentPeriod.startsAt){
            return "Sin Formulario Activo.";
        }

        const currentForm = forms.find(form => 
            form.createdAt >= currentPeriod.startsAt && form.createdAt <= currentPeriod.endsAt
        );

        if (!currentForm) {
            //// throw new Error("No form found for the current period");
            //* Instead return message, SUBJECT TO CHANGES
            return "Sin Formulario Activo";
        }

        return String(currentForm.id);
    } catch(err) {
        throw new Error(`Error: ${ (err as Error).message }`)
    }
}