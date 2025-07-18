"use server";

// Load Data
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";
import { getUserById } from "@/lib/fetches/user/getUserById";

// Custom Components
import CreateUserForm from "@/components/bolt/Inputs/CreateUserForm";


// Types
import { Role } from "@/types/Role";
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";

// NextAuth
import { auth } from "@/app/auth";
import GoBack from "@/components/bolt/Buttons/GoBack";

/**
 * @description This page is used to create a new user.
 */
async function CreateUserPage() {
  const roles: Role[] = await getAllRoles();
  const divisions: Division[] = await getAllDivisions();
  const areas: Area[] = await getAllAreas();
  const bus: BusinessUnit[] = await getAllBusinessUnits();
  const allBosses: User[] = await getAllBosses();

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-[1rem]">
          <GoBack route={"/usuarios"} />
          <h1 className="text-3xl font-bold">Crear Usuario</h1>
      </div>
      <CreateUserForm
        roles={roles}
        divisions={divisions}
        areas={areas}
        businessUnits={bus}
        bosses={allBosses}
      />
    </div>
  );
}

export default CreateUserPage;
