"use client";

import { useActionState, useTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { updateFormProgressAction } from "@/app/actions/form/updateFormProgress";

import { validObjectivesSchema } from "@/lib/formSchemas/validObjectivesSchema";

import { TypeForm } from "@/types/TypeForm";
import { TypeFormObjectives } from "@/types/TypeFormObjectives";

export interface ButtonProps {
    text: string;
    form: TypeForm;
    formObjectives: TypeFormObjectives[];
    progressID: number;
}

export default function UpdateProgressButton({ text, form, formObjectives, progressID }: ButtonProps) {
    const [state, newAction] = useActionState(updateFormProgressAction, null) //* pones la action aqui
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
        if (state === "Estado del Formulario ha sido actualizado") {
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
                {state === "Estado del Formulario ha sido actualizado" ? (
                        <p className="text-green-500 mt-2">Estado del Formulario ha sido actualizado</p>
                    ) : (
                        <p className="text-red-500 mt-2">{state}</p>
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