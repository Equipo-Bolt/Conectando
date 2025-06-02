// Components
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table"
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns"

// Fetches
import { getAllUsers } from "@/lib/fetches/user/getAllUsers"
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";


async function UsersPage() {
    const users = await getAllUsers();
    const businessesUnits = await getAllBusinessUnits();
    const divisions = await getAllDivisions();
    
    return (
        <div>
            <h1 className="text-3xl  font-bold mb-[1rem]">Administración de Usuarios</h1>

            <div className="text-lg flex flex-col gap-[1rem]" >
                <div className="flex justify-end">
                    <Button variant={"gemso_blue"} asChild>
                        <Link href={"/usuarios/crear"}>Crear Usuario</Link>
                    </Button>
                </div>
                <DataTableUsers data={users} columns={columns} divisions={divisions} businessUnits={businessesUnits}/>
            </div>
        </div>
    )
}

export default UsersPage;
