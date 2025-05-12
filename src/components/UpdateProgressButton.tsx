"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateFormProgress } from "@/app/actions/form/updateFormProgress";

export interface ButtonProps {
    text: string;
    isPending: boolean;
    formID: number;
    progressID: number;
}

export default function UpdateProgressButton({ text, isPending: externalIsPending, formID, progressID }: ButtonProps) {
    const [internalIsPending, setInternalIsPending] = useState(false);
    
    // Combined pending state (from props or internal state)
    const isButtonDisabled = externalIsPending || internalIsPending;

    const handleClick = () => {
        setInternalIsPending(true);
        
        updateFormProgress(formID, progressID)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Error updating form:", error);
            })
            .finally(() => {
                setInternalIsPending(false);
            });
    };

    return (
        <Button 
            variant={"gemso_yellow"}
            disabled={isButtonDisabled} 
            onClick={handleClick}
        >
            {text}
        </Button>
    );
}