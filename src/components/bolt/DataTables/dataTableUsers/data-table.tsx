"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Division } from "@/types/Division";
import { BusinessUnit } from "@/types/BusinessUnit";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  divisions: Division[];
  businessUnits: BusinessUnit[];
}

export function DataTableUsers<TData, TValue>({
  columns,
  data,
  divisions,
  businessUnits,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const getDivisionName = (divisionId: number): string => {
    const division = divisions.find(d => d.id === divisionId);
    return division ? division.title : "Sin División";
  };

  // Helper function to get business unit title by ID
  const getBusinessUnitName = (businessUnitId: number): string => {
    const businessUnit = businessUnits.find(bu => bu.id === businessUnitId);
    return businessUnit ? businessUnit.title : "Sin Unidad de Negocio";
  };

  return (
    <div className="rounded-md overflow-hidden mb-[2rem]">
      <Table>
        <TableHeader className="rounded-t-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="w-1/3 bg-gemso-blue text-white font-bold text-base first:rounded-tl-md last:rounded-tr-md py-2 px-4 text-left"
                >
                  <div
                    className={
                      header.column.columnDef.header === "Objetivo"
                        ? "w-78" // Set specific width for the column
                        : "w-auto"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </TableRow>
          ))}

        </TableHeader>
        <TableBody>
          {data.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="text-sm border-b bg-white border-gray-500"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="py-3 px-4 items-center">
                      {/* Map the cell content depending on division or business unit id*/}
                      {cell.column.columnDef.header === "División" ? (
                        getDivisionName(cell.getValue() as number)
                      ) : cell.column.columnDef.header ===
                        "Unidad de Negocio" ? (
                        getBusinessUnitName(cell.getValue() as number)
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center bg-white py-3 px-4"
              >
                No tiene colaboradores
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
