import { getAllCollaboratorsOfBoss } from "@/lib/fetches/user/collaborators_of_boss/getAllCollaboratorsOfBoss";
import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";

import { DataTableMyCollaborators } from "@/components/bolt/DataTables/dataTableMyCollaborator/data-table";
import { columns } from "@/components/bolt/DataTables/dataTableMyCollaborator/columns";

import { cookies } from "next/headers";

import { getFormById } from "@/lib/fetches/form/getFormById";

/**
 * @description
 * This is the page is where a user with the boss role can view the state of their collaborators' objectives.
 *
 */
async function MyCollaboratorsPage() {
  //* Using cookies
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const collaborators = await getAllCollaboratorsOfBoss(Number(userId));
  const progresses = await Promise.all(
    collaborators.map(async (collaborator) => {
      const formId = await getFormIdByUserId(collaborator.id);
      if (formId === "Sin Formulario Activo") {
        return {
          user: collaborator,
          progress: { id: 5, title: "Sin Formulario", createdAt: "today" }, //!neeeds change
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
      <h1 className="text-3xl  font-bold mb-[1rem]">Mis Colaboradores</h1>
      <div className="container mx-auto">
        {progresses.map((item, index) => (
          <div key={index}>
            <DataTableMyCollaborators columns={columns} data={[item]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCollaboratorsPage;
