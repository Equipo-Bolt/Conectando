"use server";

import Borrador from "../../../../components/Borrador";
import EsperandoRevision from "@/components/EsperandoRevision";
import IniciarPropuesta from "@/components/IniciarPropuesta";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { getProgressById } from "@/lib/fetches/progress/getProgressById";
import { getUserById } from "@/lib/fetches/user/getUserById";

import { TypeForm } from "@/types/TypeForm";
import { TypeProgress } from "@/types/TypeProgress";
import { TypeUser } from "@/types/TypeUser";

const stateComponentMap: { [key: string]: React.ReactNode } = {
  "Borrador": <Borrador />,
  "Enviado": <EsperandoRevision />,
  "Aprobado": <p> Aprobado </p>,
  "Corrigiendo en Junta": <p> Corrigiendo en Junta </p>,
  "Calificado": <p> Calificado </p>,
};


async function MisObjetivosPage() {
  const formId : string =  await getFormIdByUserId(1);
  if (formId === "No Current Form") {
    return <IniciarPropuesta/>
  }
  const form : TypeForm = await getFormById(parseInt(formId));
  const state : TypeProgress = await getProgressById(form.progressID);
  const user : TypeUser = await getUserById(form.collaboratorID);

  const content = stateComponentMap[state.title] ?? <p> Hubo en error al cargar tu formulario... </p>;

  return (
    <div>
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-2">Mis Objetivos</h1>
      {/* Subtítulo con dos líneas: Colaborador y Estado */}
      <p className="text-lg mb-4">
        Colaborador: {user.fullName}<br/>
        Estado: <span className="text-blue-600">{state.title}</span>
      </p>
      {content}
    </div>

  );
}

export default MisObjetivosPage;