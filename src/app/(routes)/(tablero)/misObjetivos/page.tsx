"use server";

import { cookies } from "next/headers";

import Borrador from "@/components/bolt/Pages/Borrador";
import Enviado from "@/components/bolt/Pages/Enviado";
import IniciarPropuesta from "@/components/bolt/Pages/IniciarPropuesta";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { getUserById } from "@/lib/fetches/user/getUserById";

import { Form } from "@/types/Form";
import { Progress } from "@/types/Progress";
import { User } from "@/types/User";

const stateComponentMap: { [key: string]: React.ReactNode } = {
  Borrador: <Borrador />,
  Enviado: <Enviado />,
  "Corrigiendo en Junta": <p> Corrigiendo en Junta </p>, //! Fran: que este en este orden plz
  Aprobado: <p> Aprobado </p>,
  Calificado: <p> Calificado </p>,
};

async function MisObjetivosPage() {
  //* Usando cookies
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  const user : User = await getUserById((Number(userId))); 
  const formId : string =  await getFormIdByUserId(user.id);
  if (formId === "Sin Formulario Activo") {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-[1rem]">Mis Objetivos</h1>

        <div className="text-lg">
          <p className="font-medium">Colaborador: {user.fullName}</p>
          <p className="text-gemso-blue font-semibold ">Estado: Sin Iniciar</p>

          <IniciarPropuesta />
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

export default MisObjetivosPage;
