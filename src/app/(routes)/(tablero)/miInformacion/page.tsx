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

export default async function MyInfoPage(){
    const session = await auth();
    const userId = parseInt(session?.user?.id || "0");
    if (!session || !session.user || !userId) {
        throw new Error("Unauthorized access");
    }
    const user : User = await getUserById(userId);
    const divisions : Division[] = await getAllDivisions();
    const roles : Role[] = await getAllRoles();
    const businessUnits : BusinessUnit[]= await getAllBusinessUnits();
    const areas : Area[] = await getAllAreas();
    const allBosses : User[] = await getAllBosses();
    const bosses: User[] = allBosses.filter(
        (boss) => boss.id !== user.id
    );
    
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
                userInfoView={false}
            />
        </div>
    );
}