"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailButton } from "@/components/bolt/Buttons/DetailButton";
import { DeleteButton } from "@/components/bolt/Buttons/DeleteButton";
import IconTooltip from "@/components/bolt/Icons/IconTooltip";
import { Objective } from "@/types/Objective";
import { disableObjectiveAction } from "@/app/actions/objective/disableObjective";
import { calculateGrade } from "@/utils/ObjectiveFormUtils/calculateGrade";
import { gradeMultipliers } from "@/types/GradeMultipliers";
import { TextWithTooltip } from "@/components/bolt/Icons/TextwithTooltip";
export const getColumns = (
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
    accessorKey: "result",
    header: "Resultado",
    cell: ({ row }) => {
      const result = row.original.result;
      return (
        <div>
          <IconTooltip>{result}</IconTooltip>
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
      const grade = row.original.grade;
      // const weight = row.original.weight;

      const multiplier =
        grade != null && grade in gradeMultipliers
          ? parseFloat((gradeMultipliers[grade] * 100).toFixed(2)).toString() +
            "%"
          : "S/C";

      // const result = calculateGrade(grade, weight);

      return <span>{multiplier}</span>;
    },
  },
  {
    accessorKey: "options",
    header: "Opciones",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center gap-6">
          <DetailButton id={id} />
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
