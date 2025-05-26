"use server";

// Load Data
import { getAllRoles } from "@/lib/fetches/role/getAllRoles";

// Custom Components
import CreateUserForm from "@/components/bolt/Inputs/CreateUserForm";


// Types
import { Role } from "@/types/Role";

/**
 * @description This page is used to create a new objective for a user.
 * It fetches the user's information, their associated form ID, and a list of classifications
 * to populate the form. The page displays the user's name and renders a form for creating objectives.
 */
async function CreateUserPage() {
  //* Using Cookies
  const roles: Role[] = await getAllRoles();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Crear Usuario</h1>
      <CreateUserForm
        roles={roles}
      />
    </div>
  );
}

export default CreateUserPage;
