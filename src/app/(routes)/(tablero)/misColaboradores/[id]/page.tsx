"use server";

import Draft from "@/components/bolt/Pages/Draft";
import Feedback from "@/components/bolt/Pages/Feedback";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { getUserById } from "@/lib/fetches/user/getUserById";

import { Form } from "@/types/Form";
import { Progress } from "@/types/Progress";
import { User } from "@/types/User";

// * NextAuth
import { auth } from "@/app/auth";

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
  const session = await auth();

  if (!session?.user) {
      throw new Error("Acceso denegado: el usuario no ha inicidado sesión (401)");
  }

  const User = await getUserById(Number(session.user.id));

  const allowedRoles = [2, 4, 6, 7];

  if (!User || !allowedRoles.includes(User.roleID)) {
      throw new Error("Acceso denegado: el usuario no tiene permisos suficientes (403)");
  }
  

  const userId = await params;
  const user: User = await getUserById(parseInt(userId.id));
  const formId: string = await getFormIdByUserId(user.id);

  
  const stateComponentMap: { [key: string]: React.ReactNode } = {
    Borrador: <Draft  />,
    Enviado: <Feedback userId={Number(userId.id)} />,
    Aprobado: <p> Aprobado </p>,
    Calificado: <p> Calificado </p>,
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
      <h1 className="text-3xl  font-bold mb-[1rem]">Objetivos</h1>

      <div className="text-lg">
        <p className="font-medium">Colaborador: {user.fullName}</p>
        <p className="text-gemso-blue font-semibold ">Estado: {state.title}</p>

        {content}
      </div>
    </div>
  );
}

export default CollaboratorObjectivesPage;
