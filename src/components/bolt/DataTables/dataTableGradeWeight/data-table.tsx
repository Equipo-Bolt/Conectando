"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FormObjectives } from "@/types/FormObjectives";
import { gradeMultipliers } from "@/types/GradeMultipliers";
import { Objective } from "@/types/Objective";
import { useMemo } from "react";

export default function SimpleStaticTable({
  data,
}: {
  data: FormObjectives[];
}) {
  const totalWeight = data.reduce((sum, item) => sum + item.weight, 0).toString() + "%";

  const finalGrade = useMemo(() => {

    // Function called by every FormObjectives object to calculate the grade of their objectives
    const calculateFinalGrade = ( objectives: Objective[]) : number => {

      const hasValidGrades = objectives.some( ({grade}) => grade != null);
      if (!hasValidGrades) return 0;

      const sum = objectives.reduce((accumulator, {grade, weight}) => {
        const multiplier =
          grade != null && grade in gradeMultipliers
          ? gradeMultipliers[grade] : 0;

        return accumulator + (weight != null ? (weight*multiplier) : 0)
      }, 0)

      return Math.round(sum * 100) / 100
    }

    const isWholeFormUngraded: boolean[] = [];

    // For every FormObjectives object calls the function that calculates its final grade
    // then multiplies that obtained final grade by the FormObjectives' weight

    const total = data.reduce((accum, item) => {
      const isGraded = item.objectives.some( ({grade}) => grade != null);
      if (!isGraded) isWholeFormUngraded.push(false)

      const itemFinalGrade = calculateFinalGrade(item.objectives);
      const weightedItemGrade = itemFinalGrade * (item.weight ? item.weight/100 : 0);
      return accum + weightedItemGrade;
    }, 0)

    const rounded = Math.round(total * 100) / 100

    if(isWholeFormUngraded.length === data.length ) return "S/C"

    return rounded <= 100 ? parseFloat(rounded.toFixed(2)).toString() + "%" : "100%";
  }, [data]);

  return (
    <div className="rounded-md overflow-hidden mb-[2rem]">
      <Table>
        <TableHeader className="rounded-t-md">
          <TableRow className="bg-gemso-blue text-white font-bold text-base first:rounded-tl-md last:rounded-tr-md py-2 px-4 text-left hover:bg-gemso-blue">
            <TableCell className="font-bold">
              Suma de Pesos de Clasificaciones
            </TableCell>
            <TableCell className="font-bold">
              Calificación Total de Clasificaciones
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-sm border-b border-gray-500">
            <TableCell className="py-3 px-4 bg-white">{totalWeight}</TableCell>
            {}
            <TableCell className="py-3 px-4 bg-white">{finalGrade}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
