import { getUsersPaginationFilters } from "@/lib/fetches/user/getUsersPaginationFilters";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getPagesPagination } from "@/lib/fetches/user/getPagesPagination";
import { CompleteUsersTable } from "@/components/bolt/Pages/CompleteUsersTable";
import type { Filter } from "@/types/Filter";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    page?: string;
    name?: string;
    roleID?: string;
    businessUnitID?: string;
  };
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = params.page || "1";
  
  const filters: Filter = {
    ...(params.name && { name: params.name }),
    ...(params.roleID && { roleID: params.roleID }),
    ...(params.businessUnitID && { businessUnitID: params.businessUnitID })
  };

  const [users, roles, businessUnits, totalPages] = await Promise.all([
    getUsersPaginationFilters(currentPage, Object.keys(filters).length ? filters : undefined),
    getAllRoles(),
    getAllBusinessUnits(),
    getPagesPagination(Object.keys(filters).length ? filters : undefined),
  ]);

  return (
    <CompleteUsersTable
      users={users}
      roles={roles}
      businessUnits={businessUnits}
      totalPages={totalPages}
      currentPage={parseInt(currentPage)}
      initialFilters={filters}
    />
  );
}