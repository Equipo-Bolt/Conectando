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
import GoBack from "@/components/bolt/Buttons/GoBack";

/**
 * @description This page is used to create a new objective for a user.
 * It fetches the user's information, their associated form ID, and a list of classifications
 * to populate the form. The page displays the user's name and renders a form for creating objectives.
 */
async function CreateObjectivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const user: User = await getUserById(Number(userId));

  const collaboratorId = (await params).id;
  const Collaborator = await getUserById(Number(collaboratorId));

  const formId: string = await getFormIdByUserId(Number(collaboratorId));
  const classifications: Classification[] = await getAllClassifications();

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-[1rem]">
        <GoBack route={`/misColaboradores/${collaboratorId}`} />
        <h1 className="text-3xl font-bold">Crear Objetivo</h1>
      </div>
      <p className="text-base mb-6">
        Colaborador: {Collaborator ? Collaborator.fullName : "N/A"}
      </p>
      <CreateObjectiveForm
        classifications={classifications}
        formId={Number(formId)}
      />
    </div>
  );
}

export default CreateObjectivePage;
