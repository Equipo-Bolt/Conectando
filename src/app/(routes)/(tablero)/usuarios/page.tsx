import { getUsersPaginationFilters } from "@/lib/fetches/user/getUsersPaginationFilters";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getPagesPagination } from "@/lib/fetches/user/getPagesPagination";

import { User } from "@/types/User";
import { BusinessUnit } from "@/types/BusinessUnit";
import { Role } from "@/types/Role";

import CompleteUsersTable from "@/components/bolt/Pages/CompleteUsersTable";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function UsersPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = page || "1";
  
  const [users, roles, businessUnits, totalPages] = await Promise.all([
    getUsersPaginationFilters(currentPage),
    getAllRoles(),
    getAllBusinessUnits(),
    getPagesPagination(),
  ]);

  return (
    <CompleteUsersTable
      users={users}
      roles={roles}
      businessUnits={businessUnits}
      totalPages={totalPages}
      currentPage={parseInt(currentPage)}
    />
  );
}