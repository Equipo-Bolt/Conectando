"use client";

import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
/**
 * ! This page was created to redirect through middelware. Middleware thrown error could not be caught by error.tsx page.
 * @returns {JSX Component}
 */
export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-4 text-center">
      <ExclamationTriangleIcon className="h-16 w-16 text-red-600" />
      <h1 className="text-2xl font-bold">403 - Acceso Denegado</h1>
      <p className="text-gray-700">
        No tienes permisos suficientes para acceder a esta página.
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => router.back()}
          className="bg-gemso-blue text-primary-foreground shadow-xs hover:bg-gemso-blue/90 hover:cursor-pointer h-12 px-4 rounded-lg"
        >
          Regresar
        </button>

        <button
          onClick={() => router.push("/")}
          className="bg-gemso-yellow text-primary-foreground shadow-xs hover:bg-gemso-yellow/90 hover:cursor-pointer h-12 px-4 rounded-lg"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}
