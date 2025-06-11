"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import IconTooltip from "@/components/bolt/Icons/IconTooltip";
import { Objective } from "@/types/Objective";

import { disableObjectiveAction } from "@/app/actions/objective/disableObjective";
import IconCommentStatus from "@/components/bolt/Icons/IconCommentStatus";
import { BossDetailButton } from "@/components/bolt/Buttons/BossDetailButton";
import { TextWithTooltip } from "@/components/bolt/Icons/TextwithTooltip";
export const getColumns = (
  collaboratorId: number,
  showDeleteButton: boolean
): ColumnDef<Objective>[] => [
  {
    accessorKey: "title",
    header: "Objetivo",
    cell: ({ row }) => {
      const title = row.original.title;

      return <TextWithTooltip title={title} />;
    },
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
    accessorKey: "comment",
    header: "Comentado",
    cell: ({ row }) => (
      <IconCommentStatus
        hasComments={row.original.comments.length === 0 ? false : true}
      />
    ),
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
