"use client";

import { useActionState, useTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { updateFormProgressAction } from "@/app/actions/form/updateFormProgress";

import { validObjectivesSchema } from "@/lib/formSchemas/validObjectivesSchema";

import { Form } from "@/types/Form";
import { FormObjectives } from "@/types/FormObjectives";

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
        if (isPending) return; // Prevent multiple clicks

        const result = validObjectivesSchema.safeParse(formObjectives);

        if (result.success) {
            startTransition(() => {
                newAction({ id: form.id, progressID: progressID});
            });
        } else {
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
            <div>
                {errorMessages.length > 0 && (
                    <div className="text-red-500 mt-2 flex flex-col items-end text-xs">
                        {errorMessages.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>  
    );
}