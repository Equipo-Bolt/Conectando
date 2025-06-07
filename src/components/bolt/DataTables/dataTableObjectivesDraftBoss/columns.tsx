"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import IconTooltip from "@/components/bolt/Icons/IconTooltip";
import { Objective } from "@/types/Objective";

import { disableObjectiveAction } from "@/app/actions/objective/disableObjective";
import { BossDetailButton } from "../../Buttons/BossDetailButton";

export const getColumns = (
  collaboratorId: number,
  showDeleteButton: boolean
): ColumnDef<Objective>[] => [
  {
    accessorKey: "title",
    header: "Objetivo",
    size: 100,
  },
  {
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
    accessorKey: "weight",
    header: "Peso",
    cell: ({ row }) => {
      const weightValue = row.original.weight;
      return <span>{weightValue}%</span>;
    },
  },
  {
    accessorKey: "options",
    header: "Opciones",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center gap-6">
          <BossDetailButton id={id} collaboratorId={collaboratorId} />
          {showDeleteButton && (
            <DeleteButton
              id={id}
              title="Eliminar Objetivo"
              description="¿Desea eliminar este objetivo? Esta acción no se puede deshacer."
              handleConfirm={async (id) => {
                await disableObjectiveAction(null, id);
                window.location.reload();
              }}
            />
          )}
        </div>
      );
    },
  },
];
