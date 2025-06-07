"use server";

// * NextAuth
import { auth } from "@/app/auth";

// Load Data
import { getAllClassifications } from "@/lib/fetches/classification/getAllClassifications";
import { getUserById } from "@/lib/fetches/user/getUserById";
import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";

// Custom Components
import CreateObjectiveForm from "@/components/bolt/Inputs/CreateObjectiveForm";

// Types
import { Classification } from "@/types/Classification";
import { User } from "@/types/User";

/**
 * @description This page is used to create a new objective for a user.
 * It fetches the user's information, their associated form ID, and a list of classifications
 * to populate the form. The page displays the user's name and renders a form for creating objectives.
 */
async function CreateObjectivePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const user: User = await getUserById(Number(userId));
  const formId: string = await getFormIdByUserId(user.id);
  const classifications: Classification[] = await getAllClassifications();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-[1rem]">Crear Objetivo</h1>
      <p className="text-base mb-6">
        Colaborador: {user ? user.fullName : "N/A"}
      </p>
      <CreateObjectiveForm
        classifications={classifications}
        formId={Number(formId)}
      />
    </div>
  );
}

export default CreateObjectivePage;
