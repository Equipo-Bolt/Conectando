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

import { Role } from "@/types/Role";
import { BusinessUnit } from "@/types/BusinessUnit";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  roles: Role[];
  businessUnits: BusinessUnit[];
}

export function DataTableUsers<TData, TValue>({
  columns,
  data,
  roles,
  businessUnits,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const getRoleName = (roleID: number): string => {
    const role = roles.find((r) => r.id === roleID);
    return role ? role.title : "Sin Rol";
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
                  className="bg-gemso-blue text-white font-bold text-base first:rounded-tl-md last:rounded-tr-md py-2 px-4 text-left"
                >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                      {
                      cell.column.columnDef.header === "Roles" ? (
                        getRoleName(cell.getValue() as number)
                      ) : 
                      cell.column.columnDef.header ===
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
