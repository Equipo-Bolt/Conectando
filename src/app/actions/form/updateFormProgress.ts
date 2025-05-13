"use server";

import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { prisma } from "@/lib/prisma";
import { TypeForm } from "@/types/TypeForm";
import { MutateFormInfo } from "@/types/TypeForm";

/**
 * * updateFormProgress  Updates the progress status of a form instance. 
 * @param prevState<string | null> Estado inicial para el useActionState hook.
 * @param data<MutateFormInfo> Solamente debe contener la id del form y del NUEVO progreso
 * @returns<string> Retorna un mensaje de exito o de fallo.
 */
export async function updateFormProgressAction(
    prevState : null | string,
    data : MutateFormInfo
) {

    //! Errores para debugeo
    if (!data.id) {
       throw new Error("data debe contener en id el id del form a actualizar");
    }

    if (!data.progressID) {
        throw new Error("data debe contener progressID para el nuevo progreso");
    }

    try {
        const targetForm = await prisma.form.findUnique({ where: { id: data.id, deactived : false } }) as TypeForm;

        if (!targetForm) {
            return("Formulario de Objetivos no encontrado");
        }

        if (targetForm.progressID === data.progressID){
            return("No se inicieron cambios, el nuevo progreso no es distinto")
        }

        const targetProgress = await prisma.progress.findUnique({
          where: { id: data.progressID, deactived : false },
          select: { id : true, title: true },
            });  

        if (!targetProgress) {
          return("No es encontró el progreso que se quiere asignar");
        }

        //! POSIBLE CAMBIO POR PETICION DE FRONt
        //* si el progreso actual se salta un progreso de más no se puede hacer el cambio
        if ((data.progressID - targetForm.progressID) >= 2) {
            throw new Error("Se están saltando 1 o más estados para el cambio de estado de formulario.");
        }

        if ((targetForm.progressID == 1 && data.progressID == 2) || 
        (targetForm.progressID == 2 && data.progressID == 3)) {
          const allObjectives = await getObjectivesByFormId(targetForm.id)
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

        return ("Estado del Formulario ha sido actualizado");
    } catch(err) {
        throw new Error(`Al cambiar estado de formulario: ${(err as Error).message}`);
    }
}
