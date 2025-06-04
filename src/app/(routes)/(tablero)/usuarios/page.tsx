// Components
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table"
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns"

// Fetches
import { getAllUsers } from "@/lib/fetches/user/getAllUsers"
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";


// NextAuth
import { User } from "@/types/User";
import FilterForm from "@/components/bolt/Inputs/FilterForm";

async function UsersPage() {
    const users: User[] = await getAllUsers();
    const businessesUnits = await getAllBusinessUnits();
    const roles = await getAllRoles();

    return (
        <div>
            <h1 className="text-3xl  font-bold mb-[2rem] ">Administración de Usuarios</h1>

            <div className="text-lg flex flex-col gap-[1rem]" >
                <div className="flex flex-row justify-between">
                    <FilterForm roles={roles} businessUnits={businessesUnits}></FilterForm>
                    
                    <div className="flex flex-col justify-center mb-[2rem">
                        <Button variant={"gemso_blue"} asChild>
                            <Link href={"/usuarios/crear"}>Crear Usuario</Link>
                        </Button>
                    </div>

                </div>
                <DataTableUsers data={users} columns={columns} roles={roles} businessUnits={businessesUnits}/>
            </div>
        </div>
    )
}

export default UsersPage;
