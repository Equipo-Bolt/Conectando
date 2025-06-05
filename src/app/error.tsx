"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Error occurred:", error);
    }, [error]);

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-full gap-[1rem]">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-600" />
            <h1 className="text-2xl font-bold">Oops... Nos encontramos con un error</h1>
            <p className="text-gray-700">{error.message}</p>
            {error.digest && <p className="text-sm text-gray-500">Error Digest: {error.digest}</p>}

            <button
                onClick={() => router.back()}
                className="bg-gemso-blue text-primary-foreground shadow-xs hover:bg-gemso-blue/90 hover:cursor-pointer h-[3rem] w-auto px-4 py-2 has-[>svg]:px-3 rounded-lg mt-2"
            >
                Regresar
            </button>
            
            <button
                onClick={() => reset()}
                className="bg-gemso-yellow text-primary-foreground shadow-xs hover:bg-gemso-yellow/90 hover:cursor-pointer h-[3rem] w-auto px-4 py-2 has-[>svg]:px-3 rounded-lg"
            >
                ¿Intentar de nuevo?
            </button>
        </div>
    );
}