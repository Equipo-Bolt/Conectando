"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DetailButton } from "@/components/DetailButton"
import { DeleteButton } from "@/components/DeleteButton"
import { DocumentTextIcon } from "@heroicons/react/24/solid";

//? Ese columns.tsx esta abierto a cambios para adaptar los datos que se necesitan de la DB

//TODO IMPOERTANTE: importar el TypeObjective.ts que hizo el Francisco

// Datos dentro de un Objetivo de un tabla de objetivos
export type Objectives = {
  id: number
  objectiveTitle: string
  //* goal es el icono que indica si la meta fue revisada o no, verde o rojo
  goal: "written" | "null"
  //* peso que tiene este objetivo dentro de la clasificacion
  weight: number
  //* calificacion que tiene este objetivo dentro de la clasificacion
  score: number | null // Permitimos que score sea nulo cuando no tenga califiacacion

  // id: number
  // result: string | null
  // grade: number | null
  // weight: number
  // title: string
  // goal: string | null
  // formID: number
  // createdAt: Date
  // objectiveClassificationID: number
}

export const columns: ColumnDef<Objectives>[] = [
  {
    accessorKey: "objectiveTitle",
    header: "Objetivo",
  },
  {
    //* Este es el icono que indica si la meta fue declarada o no
    accessorKey: "goal",
    header: "Meta",
    cell: ({ row }) => {
      const goalStatus = row.original.goal;
      return (
        //! corregir esto al color verde cuando este redactada la meta
        <div>
          {goalStatus === "written" ? (
            <DocumentTextIcon className="w-5 h-5 text-red-500 " />
          ) : (
            <DocumentTextIcon className="w-5 h-5 text-green-800" />
          )}
        </div>
      );
    },
  },
  {
    //* Se agrega porcentaje al peso para que se vea mas chilo
    accessorKey: "weight",
    header: "Peso",
    cell: ({ row }) => {
      const weightValue = row.original.weight;
      return <span>{weightValue}%</span>;
    },
  },
  {
    accessorKey: "score",
    header: "Calificación",
    cell: ({ row }) => {
      const scoreValue = row.original.score;
      //! este return esta comentado monas para ver el caso en el que no se tenga calificaicones
      //! cambiar esto cuando se tenga datos reales de la DB
      // return <span>{scoreValue === null || scoreValue === undefined ? "S/C" : scoreValue}</span>;
      return "S/C"

    },
  },
  {
    //* Estos son los botones de opciones que se ven en la tabla
    accessorKey: "options",
    header: "Opciones",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <div className="flex items-center gap-6">
          <DetailButton id={id} />
          <DeleteButton
            id={id}
            title="Eliminar objetivo"
            description="¿Seguro que deseas eliminar este objetivo? Esta acción no se puede deshacer."
            handleConfirm={(id) => {
              console.log("Aquí podrías eliminar el objetivo con ID:", id);
              // Aquí podrías meter una llamada a la API, o cualquier otra acción específica
            }}
          />

        </div>
      )
    },
  },
];