"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table";
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns";
import FilterForm from "@/components/bolt/Inputs/FilterForm";
import PaginationComponent from "@/components/bolt/Paginations/Pagination";
import { User } from "@/types/User";
import { BusinessUnit } from "@/types/BusinessUnit";
import { Role } from "@/types/Role";

interface CompleteUsersTableProps {
  users: User[];
  businessUnits: BusinessUnit[];
  roles: Role[];
  totalPages: number;
  currentPage: number;
}

export default function CompleteUsersTable({
  users,
  roles,
  businessUnits,
  totalPages,
  currentPage,
}: CompleteUsersTableProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Administración de Usuarios</h1>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <FilterForm roles={roles} businessUnits={businessUnits} />
          
          <Button variant="gemso_blue" asChild>
            <Link href="/usuarios/crear">Crear Usuario</Link>
          </Button>
        </div>

        <DataTableUsers 
          data={users} 
          columns={columns} 
          roles={roles} 
          businessUnits={businessUnits} 
        />
      </div>

      <PaginationComponent 
        totalPages={totalPages} 
        currentPage={currentPage} 
      />
    </div>
  );
}