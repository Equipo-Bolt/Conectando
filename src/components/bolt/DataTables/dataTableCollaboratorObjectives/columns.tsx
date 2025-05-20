"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailButton } from "@/components/bolt/Buttons/DetailButton";
import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import IconTooltip from "@/components/bolt/Icons/IconTooltip";
import { Objective } from "@/types/Objective";

import { disableObjectiveAction } from "@/app/actions/objective/disableObjective";

import IconCommentStatus from "@/components/bolt/Icons/IconCommentStatus";

export const columns: ColumnDef<Objective>[] = [
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
    accessorKey: "score",
    header: "Calificación",
    cell: ({ row }) => {
      const scoreValue = row.original.grade;

      return (
        <span>
          {scoreValue === null || scoreValue === undefined ? "S/C" : scoreValue}
        </span>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Comentario",
    cell: ({ row }) => <IconCommentStatus objectiveId={row.original.id} />,
  },
  {
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
              window.location.reload();
            }}
          />
        </div>
      );
    },
  },
];
