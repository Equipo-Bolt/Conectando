import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table"
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns"

import { getAllUsers } from "@/lib/fetches/user/getAllUsers"
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";

async function UsersPage() {
    const users = await getAllUsers();
    const businessesUnits = await getAllBusinessUnits();
    const divisions = await getAllDivisions();
    
    return (
        <div>
            <DataTableUsers data={users} columns={columns} divisions={divisions} businessUnits={businessesUnits}/>
        </div>
    )
}

export default UsersPage;
