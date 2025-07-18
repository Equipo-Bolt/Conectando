"use server";

import Draft from "@/components/bolt/Pages/Collaborator/Draft";
import Sent from "@/components/bolt/Pages/Collaborator/Sent";
import Approved from "@/components/bolt/Pages/Collaborator/Approved";
import Graded from "@/components/bolt/Pages/Collaborator/Graded";
import StartProposal from "@/components/bolt/Pages/Collaborator/StartProposal";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { getUserById } from "@/lib/fetches/user/getUserById";

import { Form } from "@/types/Form";
import { Progress } from "@/types/Progress";
import { User } from "@/types/User";

// * NextAuth
import { auth } from "@/app/auth";

const stateComponentMap: { [key: string]: React.ReactNode } = {
  Borrador: <Draft />,
  Enviado: <Sent />,
  Aprobado: <Approved />,
  Calificado: <Graded />,
};

/**
 * @description This is where the objectives of a user with the collaborator role are displayed.
 * The page displays a different component depending on the Objectives state.
 */
async function MyObjectivesPage() {
  const session = await auth();
  const user: User = await getUserById(Number(session?.user?.id));
  const formId: string = await getFormIdByUserId(user.id);

  if (formId === "Sin Formulario Activo") {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-[1rem]">Mis Objetivos</h1>

        <div className="text-lg">
          <p className="font-medium">Colaborador: {user.fullName}</p>
          <p className="text-gemso-blue font-semibold ">Estado: Sin Iniciar</p>

          <StartProposal />
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
      <h1 className="text-3xl  font-bold mb-[1rem]">Mis Objetivos</h1>

      <div className="text-lg">
        <p className="font-medium">Colaborador: {user.fullName}</p>
        <p className="text-gemso-blue font-semibold ">Estado: {state.title}</p>

        {content}
      </div>
    </div>
  );
}

export default MyObjectivesPage;
