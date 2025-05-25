import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table"
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns"

import { getAllUsers } from "@/lib/fetches/user/getAllUsers"
import { getBusinessUnitById } from "@/lib/fetches/business_unit/getBusinessUnitById";
import { getDivisionById } from "@/lib/fetches/division/getDivisionById";

export async function UsersPage() {
    const users = await getAllUsers();

    const businessesUnits = await Promise.all(
        users.map(async (user) => {
            const businessUnit = await getBusinessUnitById(user.businessUnitID as number);
            return {
                businessUnit: businessUnit
            };
        })
    );

    const divisions = await Promise.all(
        businessesUnits.map(async (businessUnit) => {
            const division = await getDivisionById(businessUnit.businessUnit.divisionID);
            return {
                division: division.title,
            };
        })
    );

    return (
        <div>
            <DataTableUsers data={users} columns={columns} divisions={divisions} />
        </div>
    )
}
