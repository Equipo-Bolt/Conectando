"use server";

import { prisma } from "@/lib/prisma";

import { Form } from "@/types/Form";
import { MutateForm } from "@/types/Form";
import { ServerActionResponse } from "@/types/ServerActionResponse";

import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";

/**
 * * updateFormProgress()  Updates the progress status of a form instance. 
 * @param prevState<string> Initial state of action, set this parameter to null
 * @param data<{@link MutateForm}> Contains ID of the form to update and the porgress ID of from the catalog
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateFormProgressAction(
    prevState : ServerActionResponse | null,
    data : MutateForm
) : Promise<ServerActionResponse> {
    try {
        //!Debugging errors, should not appear for user
        if (!data.id) {
            throw new Error("Data debe contener en id el id del form a actualizar");
        }

        if (!data.progressID) {
            throw new Error("Data debe contener progressID para el nuevo progreso");
        }

        const targetForm = await prisma.form.findUnique({ where: { id: data.id, deactived : false } }) as Form;

        if (!targetForm) {
            throw new Error("Formulario de Objetivos no encontrado");
        }

        if (targetForm.progressID === data.progressID){
            throw new Error("No se hicieron cambios, el nuevo progreso no es distinto")
        }

        const targetProgress = await prisma.progress.findUnique({
          where: { id: data.progressID, deactived : false },
          select: { id : true, title: true },
            });  

        if (!targetProgress) {
          throw new Error("No es encontró el progreso que se quiere asignar");
        }

        if ((data.progressID - targetForm.progressID) >= 2) {
            throw new Error("Se están saltando 1 o más estados para el cambio de estado de formulario.");
        }

        if (
          (targetForm.progressID === 1 && data.progressID === 2) || 
          (targetForm.progressID === 2 && data.progressID === 3)
        ) {
          const allObjectives = await getObjectivesByFormId(targetForm.id) || [];
          const sumWeight = allObjectives.reduce((acc, currVal) => {
            return acc + currVal.weight
          },0);

          if (sumWeight !== 100) {
            throw new Error("La suma de pesos no da 100%");
          }
        }
        
        switch (data.progressID) {
            case 3:
                data.approvedAt = new Date();
                break;
               
            case 4:
                data.gradedAt = new Date();
                break;  
            
            default:
                data.approvedAt = null;
                data.gradedAt = null;
        }
        
        await prisma.form.update({
            where: { id: data.id },
            data: {
                progress: {
                    connect: { id: data.progressID }
                },
                approvedAt: data.approvedAt,
                gradedAt: data.gradedAt,
            },
        });

        return ( {success: true, message : "Estado del Formulario ha sido actualizado"});
    } catch(error) {
        console.error(`Error when updating form progress: ${(error as Error).message}`);
        return {success: false, error :`${(error as Error).message}`}
    }
}
