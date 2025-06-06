import { getAllCollaboratorsOfBoss } from "@/lib/fetches/user/collaborators_of_boss/getAllCollaboratorsOfBoss";
import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";

import { DataTableMyCollaborators } from "@/components/bolt/DataTables/dataTableMyCollaborator/data-table";
import { columns } from "@/components/bolt/DataTables/dataTableMyCollaborator/columns";

import { auth } from "@/app/auth";
import { getFormById } from "@/lib/fetches/form/getFormById";

/**
 * @description
 * This is the page where a user with the boss role can view the state of their collaborators' objectives.
 */
async function MyCollaboratorsPage() {
  // Get user ID from cookies
    const session = await auth();
    const userId = session?.user?.id;

  // Get collaborators and their progress
  const collaborators = await getAllCollaboratorsOfBoss(Number(userId));
  const progresses = await Promise.all(
    collaborators.map(async (collaborator) => {
      const formId = await getFormIdByUserId(collaborator.id);
      if (formId === "Sin Formulario Activo") {
        return {
          user: collaborator,
          progress: { id: 5, title: "Sin Formulario", createdAt: "today" }, // puedes ajustar esto si quieres
        };
      }
      const form = await getFormById(parseInt(formId));
      const progress = await getProgressById(form.progressID);
      return {
        user: collaborator,
        progress: progress,
      };
    })
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-[1rem]">Mis Colaboradores</h1>
      <DataTableMyCollaborators columns={columns} data={progresses} />
    </div>
  );
}

export default MyCollaboratorsPage;
