"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailButton } from "@/components/bolt/Buttons/DetailButton";
import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import IconTooltip from "@/components/bolt/Icons/IconTooltip";
import { TypeObjective } from "@/types/TypeObjective";
import { disableObjectiveAction } from "@/app/actions/objective/disableObjective";

export const columns: ColumnDef<TypeObjective>[] = [
  {
    accessorKey: "title",
    header: "Objetivo",
    size: 100,
  },
  {
    //* Este es el icono que indica si la meta fue declarada o no
    accessorKey: "goal",
    header: "Meta",
    cell: ({ row }) => {
      const goalStatus = row.original.goal;
      return (
        <div>
          <IconTooltip>{goalStatus}</IconTooltip>
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
      const scoreValue = row.original.grade;
      //* Si es dato nulo o indefinido, se muestra "S/C" (Sin Calificación)
      return (
        <span>
          {scoreValue === null || scoreValue === undefined ? "S/C" : scoreValue}
        </span>
      );
    },
  },
  {
    //* Estos son los botones de opciones que se ven en la tabla
    accessorKey: "options",
    header: "Opciones",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center gap-6">
          <DetailButton id={id} />
          <DeleteButton
            id={id}
            title="Eliminar objetivo"
            description="¿Seguro que deseas eliminar este objetivo? Esta acción no se puede deshacer."
            handleConfirm={async (id) => {
              await disableObjectiveAction(id);
              window.location.reload(); // Recargar la página después de eliminar el objetivo
            }}
          />
        </div>
      );
    },
  },
];
