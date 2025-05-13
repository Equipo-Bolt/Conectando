"use client";

import { useActionState, useTransition, useEffect } from "react";
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

    const handleClick = () => {
        if (isPending) return; // Prevent multiple clicks

        const result = validObjectivesSchema.safeParse(formObjectives);

        if (result.success) {
            startTransition(() => {
                newAction({ id: form.id, progressID: progressID});
            });
        } else {
            console.error("Validation errors:", result.error.errors);
            return;    
        }
    }

    useEffect(() => {
        if (state === null) return;
        if (state === "Estado del Formulario ha sido actualizado") {
            window.location.reload();
        } else {
            console.error("Error updating progress:", state);
        }
    }, [state]);

    return (
        <Button 
            variant={"gemso_yellow"}
            disabled={isPending}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
}