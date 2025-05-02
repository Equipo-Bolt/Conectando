"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { createFormAction } from "@/app/actions/form/createForm";

export default function IniciarPropuestaButton () {
    const router = useRouter();

    const handleClick = async () => {
        // Call the action to create a form
        const userId = 6; // Replace with the actual user ID
        const result = await createFormAction(null, userId);
        
        if (result === "Form created for user") {
            // Redirect to the form creation page
            router.refresh();
        } else {
            return (
                <div className="text-red-500 text-center mt-4">
                    {result}
                </div>
            );
        }
    };

    return (
        <Button className="bg-gemso-yellow hover:bg-gemso-yellow/90 text-white font-bold py-2 px-4 rounded shadow-md" onClick={handleClick}>
            Iniciar mi propuesta de objetivos
        </Button>
    );
}