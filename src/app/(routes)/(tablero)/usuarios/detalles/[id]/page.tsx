// Custom Components
import UserViewEdit from "@/components/bolt/Inputs/UserViewEdit";

// Fetches
import { getUserById } from "@/lib/fetches/user/getUserById";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";

// Types
import { UpdateUserFormData, User } from "@/types/User";
import { Division } from "@/types/Division";
import { Role } from "@/types/Role";
import { BusinessUnit } from "@/types/BusinessUnit";
import { Area } from "@/types/Area";

// NextAuth
import { auth } from "@/app/auth";

export default async function UserDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userParams = await params;
    const userId = parseInt(userParams.id);
    const user : User = await getUserById(userId);
    const divisions : Division[] = await getAllDivisions();
    const roles : Role[] = await getAllRoles();
    const businessUnits : BusinessUnit[]= await getAllBusinessUnits();
    const areas : Area[] = await getAllAreas();
    const allBosses : User[] = await getAllBosses();
    const bosses: User[] = allBosses.filter(
        (boss) => boss.id !== user.id
    );

    const session = await auth();

    if (!session?.user) {
        throw new Error("Acceso denegado: el usuario no ha inicidado sesión (401)");
    }

    const User = await getUserById(Number(session.user.id));

    const allowedRoles = [3, 5, 6, 7];

    if (!User || !allowedRoles.includes(User.roleID)) {
        throw new Error("Acceso denegado: el usuario no tiene permisos suficientes (403)");
    }
    
    const userData: UpdateUserFormData = {
        id: user.id,
        email: user.email,
        roleID: user.roleID.toString(),
        employeeNumber: user.employeeNumber?.toString() || "",
        fullName: user.fullName || "",
        bossID: user.bossID?.toString() || "",
        divisionID: user.divisionID?.toString() || "",
        businessUnitID: user.businessUnitID?.toString() || "",
        companySeniority: user.companySeniority?.toString() || "",
        positionSeniority: user.positionSeniority?.toString() || "",
        areaID: user.areaID?.toString() || "",
        position: user.jobPosition?.toString() || "",
        companyContribution: user.companyContribution || "",
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Detalles del Usuario</h1>
            <UserViewEdit
                user={userData}
                divisions={divisions}
                roles={roles}
                businessUnits={businessUnits}
                areas={areas}
                bosses={bosses}
            />
        </div>
    );
}