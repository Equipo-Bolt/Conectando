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

/**
 * @description This page is used to create a new user.
 */
async function CreateUserPage() {
  const session = await auth();
  const roles: Role[] = await getAllRoles();
  const divisions: Division[] = await getAllDivisions();
  const areas: Area[] = await getAllAreas();
  const bus: BusinessUnit[] = await getAllBusinessUnits();
  const allBosses: User[] = await getAllBosses();

  const User = await getUserById(Number(session?.user.id));

const bosses = allBosses.filter(
  (boss) => boss.id !== User.id
);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-[1rem]">Crear Usuario</h1>
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
