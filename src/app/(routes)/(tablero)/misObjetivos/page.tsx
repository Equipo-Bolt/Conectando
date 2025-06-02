"use server";

import Draft from "@/components/bolt/Pages/Draft";
import Sent from "@/components/bolt/Pages/Sent";
import StartProposal from "@/components/bolt/Pages/StartProposal";

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
  "Corrigiendo en Junta": <p> Corrigiendo en Junta </p>,
  Aprobado: <p> Aprobado </p>,
  Calificado: <p> Calificado </p>,
};

/**
 * @description This is where the objectives of a user with the collaborator role are displayed.
 * The page displays a different component depending on the Objectives state.
 */
async function MyObjectivesPage() {
  const session = await auth();
  const user: User = await getUserById(Number(session?.user?.id));
  const formId: string = await getFormIdByUserId(user.id);

  if (!session?.user) {
      throw new Error("Acceso denegado: el usuario no ha inicidado sesión (401)");
  }

  const User = await getUserById(Number(session.user.id));

  const allowedRoles = [1, 4, 5, 7];

  if (!User || !allowedRoles.includes(User.roleID)) {
      throw new Error("Acceso denegado: el usuario no tiene permisos suficientes (403)");
  }

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
