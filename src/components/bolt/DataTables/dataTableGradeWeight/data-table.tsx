"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FormObjectives } from "@/types/FormObjectives";

export default function SimpleStaticTable({
  data,
}: {
  data: FormObjectives[];
}) {
  const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);

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
            <TableCell className="py-3 px-4 bg-white">S/C</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
