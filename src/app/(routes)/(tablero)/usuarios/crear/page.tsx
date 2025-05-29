"use server";

// Load Data
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";

// Custom Components
import CreateUserForm from "@/components/bolt/Inputs/CreateUserForm";


// Types
import { Role } from "@/types/Role";
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";

/**
 * @description This page is used to create a new user.
 */
async function CreateUserPage() {
  const roles: Role[] = await getAllRoles();
  const divisions: Division[] = await getAllDivisions();
  const areas: Area[] = await getAllAreas();
  const bus: BusinessUnit[] = await getAllBusinessUnits();
  const bosses: User[] = await getAllBosses();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Crear Usuario</h1>
      <CreateUserForm
        roles={roles}
        divisions={divisions}
        areas={areas}
        businessUnits={bus}
        bosses={bosses}
      />
    </div>
  );
}

export default CreateUserPage;
