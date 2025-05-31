// Components
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableUsers } from "@/components/bolt/DataTables/dataTableUsers/data-table"
import { columns } from "@/components/bolt/DataTables/dataTableUsers/columns"

// Fetches
import { getAllUsers } from "@/lib/fetches/user/getAllUsers"
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getUserById } from "@/lib/fetches/user/getUserById";

// NextAuth
import { auth } from "@/app/auth";
import { User } from "@/types/User";

async function UsersPage() {
    const users: User[] = await getAllUsers();
    const businessesUnits = await getAllBusinessUnits();
    const roles = await getAllRoles();
    const session = await auth();

    if (!session?.user) {
        throw new Error("Acceso denegado: el usuario no ha inicidado sesión (401)");
    }

    const User = await getUserById(Number(session.user.id));

    const allowedRoles = [3, 5, 6, 7];

    if (!User || !allowedRoles.includes(User.roleID)) {
        throw new Error("Acceso denegado: el usuario no tiene permisos suficientes (403)");
    }

    return (
        <div>
            <h1 className="text-3xl  font-bold mb-[1rem]">Administración de Usuarios</h1>

            <div className="text-lg flex flex-col gap-[1rem]" >
                <div className="flex justify-end">
                    <Button variant={"gemso_blue"} asChild>
                        <Link href={"/usuarios/crear"}>Crear Usuario</Link>
                    </Button>
                </div>
                <DataTableUsers data={users} columns={columns} roles={roles} businessUnits={businessesUnits}/>
            </div>
        </div>
    )
}

export default UsersPage;
