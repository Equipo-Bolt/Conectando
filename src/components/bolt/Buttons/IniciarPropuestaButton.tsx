"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createFormAction } from "@/app/actions/form/createForm";

export default function IniciarPropuestaButton( {userId} : {userId : number}) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        const result = await createFormAction(null, userId);

        if (result === "Formulario de objetivos creado") {
            router.refresh();
        } else {
            setError(result); // Guarda el error para mostrarlo en pantalla
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Button
                className="bg-gemso-yellow hover:bg-gemso-yellow/90 text-white font-bold py-2 px-4 rounded shadow-md"
                onClick={handleClick}
            >
                Iniciar mi propuesta de objetivos
            </Button>
            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            )}
        </div>
    );
}
