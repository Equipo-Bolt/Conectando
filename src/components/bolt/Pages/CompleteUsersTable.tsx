"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table";
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns";
import { FilterForm } from "@/components/bolt/Inputs/FilterForm";
import { PaginationComponent } from "@/components/bolt/Paginations/Pagination";
import type { User} from "@/types/User";
import type { BusinessUnit} from "@/types/BusinessUnit";
import type { Role} from "@/types/Role";
import type { Filter} from "@/types/Filter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CompleteUsersTableProps {
  users: User[];
  businessUnits: BusinessUnit[];
  roles: Role[];
  totalPages: number;
  currentPage: number;
  initialFilters: Filter;
}

export function CompleteUsersTable({
  users,
  roles,
  businessUnits,
  totalPages,
  currentPage,
  initialFilters,
}: CompleteUsersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterSubmit = (filters: Filter) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    
    if (filters.name) params.set("name", filters.name);
    if (filters.roleID) params.set("roleID", filters.roleID);
    if (filters.businessUnitID) params.set("businessUnitID", filters.businessUnitID);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-[2rem]">
      <h1 className="text-3xl font-bold">Administración de Usuarios</h1>

      <div className="flex flex-col gap-[1rem]">
        <div className="flex justify-between items-center flex-wrap gap-[1rem]">
          <FilterForm 
            roles={roles} 
            businessUnits={businessUnits}
            initialFilters={initialFilters}
            onSubmit={handleFilterSubmit}
          />
          
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