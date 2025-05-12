"use client";

import { useActionState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { updateFormProgressAction } from "@/app/actions/form/updateFormProgress";

import { validObjectivesSchema } from "@/lib/formSchemas/validObjectivesSchema";

export interface ButtonProps {
    text: string;
    formID: number;
    progressID: number;
}

export default function UpdateProgressButton({ text, formID, progressID }: ButtonProps) {
    const [state, newAction] = useActionState(updateFormProgressAction, null) //* pones la action aqui
    const [isPending, startTransition] = useTransition();


    const handleClick = () => {
        if (isPending) return; // Prevent multiple clicks
        
        startTransition(() => {
            newAction({ id: formID, progressID: progressID});
        });
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