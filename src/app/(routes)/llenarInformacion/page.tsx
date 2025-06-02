"use server";

import { CompleteInfoForm } from "@/components/bolt/Inputs/CompleteInfoForm";

// Fetches
import { getAllDivisions } from "@/lib/fetches/division/getAllDivisions";
import { getAllAreas } from "@/lib/fetches/area/getAllAreas";
import { getAllBusinessUnits } from "@/lib/fetches/business_unit/getAllBusinessUnits";
import { getAllBosses } from "@/lib/fetches/user/boss/getAllBosses";
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";
import { getUserById } from "@/lib/fetches/user/getUserById";

// Types
import { Division } from "@/types/Division";
import { Area } from "@/types/Area";
import { BusinessUnit } from "@/types/BusinessUnit";
import { User } from "@/types/User";
import { Role } from "@/types/Role";

// * NextAuth
import { auth } from "@/app/auth";

/**
 * A server component that loads data asynchronously and renders a page
 * for completing user information. The page includes a form populated
 * with data fetched from various sources.
 *
 * @async
 * @function Page
 * @returns {JSX.Element} A JSX element containing the page layout and form.
 *
 * @remarks
 * This component fetches the following data:
 * - Divisions (`Division[]`) via `getAllDivisions`
 * - Areas (`Area[]`) via `getAllAreas`
 * - Business Units (`BusinessUnit[]`) via `getAllBusinessUnits`
 * - Bosses (`User[]`) via `getAllBosses`
 *
 * The fetched data is passed as props to the `CompleteInfoForm` component.
 */
async function Page() {
  const session = await auth();
  const user: User = await getUserById(Number(session?.user?.id));
  const divisions: Division[] = await getAllDivisions();
  const areas: Area[] = await getAllAreas();
  const bus: BusinessUnit[] = await getAllBusinessUnits();
  const bosses: User[] = await getAllBosses();
  const roles: Role[] = await getAllRoles();

  return (
    <div className="p-[3rem]">
      <h1 className="text-4xl font-bold mb-[1rem]">Completa tu información</h1>
      <CompleteInfoForm
        divisions={divisions}
        areas={areas}
        businessUnits={bus}
        bosses={bosses}
        roles={roles}
        user={user} // Assuming userId is not needed here, or you can pass a valid userId
      />
    </div>
  );
}

export default Page;
