"use client";

import { useActionState, useTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { updateFormProgressAction } from "@/app/actions/form/updateFormProgress";

// * Progress Validators/Schemas
import { draftFormSchema } from "@/lib/Schemas/progressSchemas/draftFormSchema";
import { sentFormSchema } from "@/lib/Schemas/progressSchemas/sentFormSchema";
import { approvedFormSchema } from "@/lib/Schemas/progressSchemas/approvedFormSchema";

import { Form } from "@/types/Form";
import { FormObjectives } from "@/types/FormObjectives";
import { ErrorModal } from "@/components/bolt/Modals/ErrorModal";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid" 

// didnt have time to make this pretty
// * Enum for progress IDs
export enum ProgressID {
    Draft = 2,
    Sent = 3,
    Approved = 4,
}

// * Map progress IDs to schemas
const progressSchemaMap = {
    [ProgressID.Draft]: draftFormSchema,
    [ProgressID.Sent]: sentFormSchema,
    [ProgressID.Approved]: approvedFormSchema,
};

export interface ButtonProps {
    text: string;
    form: Form;
    formObjectives: FormObjectives[];
    progressID: number;
}

export default function UpdateProgressButton({ text, form, formObjectives, progressID }: ButtonProps) {
    const [state, newAction] = useActionState(updateFormProgressAction, null)
    const [isPending, startTransition] = useTransition();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleClick = () => {
        if (isPending) return; 

        //! select validator/schema
        const selectedSchema = progressSchemaMap[(progressID) as ProgressID]

        const result = selectedSchema.safeParse(formObjectives);

        if (result.success) {
            startTransition(() => {
                newAction({ id: form.id, progressID: progressID});
            });
        } else {
            console.log(result.error?.message);
            setErrorMessages(result.error.issues.map(issue => issue.message));
            return;
        }
    }

    useEffect(() => {
        if (state === null) return;
        if (state.success) {
            window.location.reload();
        }
    }, [state]);

    return (
        <div className="flex flex-col items-end">
            <Button 
                variant={"gemso_yellow"}
                disabled={isPending}
                onClick={handleClick}
            >
                {text}
            </Button>
            
            {/* Mensaje de Estado */}
            <div>
                {state?.success ? (
                        <p className="text-green-500 mt-2">Estado del Formulario ha sido actualizado</p>
                    ) : (
                        <p className="text-red-500 mt-2">{state?.error}</p>
                    )
                }
            </div>
            {/* Mensaje de Error */}
            {errorMessages.length > 0 && (
                <ErrorModal
                    icon={<ExclamationTriangleIcon className="w-10 h-10" />}
                    open={errorMessages.length > 0}
                    setOpen={() => setErrorMessages([])}
                    title="Por favor, revise los errores"
                    description={
                        errorMessages.length > 0
                            ? errorMessages
                            : ["No se pudo actualizar el progreso del formulario. Por favor, intente nuevamente."]
                    }
                    finishText="Aceptar"
                />
            )}
        </div>  
    );
}