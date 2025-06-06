"use server";

import Draft from "@/components/bolt/Pages/Draft";
import Sent from "@/components/bolt/Pages/Boss/Sent";
import Approved from "@/components/bolt/Pages/Boss/Approved";
import Graded from "@/components/bolt/Pages/Boss/Graded";

import GoBack from "@/components/bolt/Buttons/GoBack";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { getUserById } from "@/lib/fetches/user/getUserById";

import { Form } from "@/types/Form";
import { Progress } from "@/types/Progress";
import { User } from "@/types/User";

/**
 * @description This page displays the objectives of a collaborator based on their progress state.
 * It fetches user, form, and progress data asynchronously using the provided `id` parameter.
 * If no active form is found, it displays a "Sin Iniciar" state message.
 * Otherwise, it renders the collaborator's objectives and their current progress state.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the collaborator.
 *
 * @returns {JSX.Element} The rendered component displaying the collaborator's objectives and progress state.
 */
async function CollaboratorObjectivesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await params;
  const user: User = await getUserById(parseInt(userId.id));
  const formId: string = await getFormIdByUserId(user.id);

  const stateComponentMap: { [key: string]: React.ReactNode } = {
    Borrador: <Draft />,
    Enviado: <Sent userId={Number(userId.id)} />,
    Aprobado: <Approved userId={Number(userId.id)} />,
    Calificado: <Graded userId={Number(userId.id)} />,
  };

  if (formId === "Sin Formulario Activo") {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-[1rem]">Objetivos</h1>

        <div className="text-lg">
          <p className="font-medium">Colaborador: {user.fullName}</p>
          <p className="text-gemso-blue font-semibold ">Estado: Sin Iniciar</p>
        </div>
      </div>
    );
  }
  const form: Form = await getFormById(parseInt(formId));
  const state: Progress = await getProgressById(form.progressID);

  const content = stateComponentMap[state.title] ?? (
    <p> Hubo un error al cargar tu formulario... </p>
  );

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-4">
        <GoBack route={"/misColaboradores"} />
        <h1 className="text-3xl  font-bold ">Objetivos</h1>
      </div>
      <div className="text-lg">
        <p className="font-medium">Colaborador: {user.fullName}</p>
        <p className="text-gemso-blue font-semibold ">Estado: {state.title}</p>

        {content}
      </div>
    </div>
  );
}

export default CollaboratorObjectivesPage;
