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
  Borrador: <Borrador />,
  Enviado: <EsperandoRevision />,
  "Corrigiendo en Junta": <p> Corrigiendo en Junta </p>, //! Fran: que este en este orden plz
  Aprobado: <p> Aprobado </p>,
  Calificado: <p> Calificado </p>,
};

async function MisObjetivosPage() {
  const user : TypeUser = await getUserById(2); //! default 2
  const formId : string =  await getFormIdByUserId(user.id);
  if (formId === "Sin Formulario Activo") {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-[1rem]">Mis Objetivos</h1>
        <p className="text-lg">
          Colaborador: {user.fullName}<br/>
          Estado: <span className="text-blue-600">Sin Iniciar</span>
        </p>
        <IniciarPropuesta />
      </div>
    );
  }
  const form : TypeForm = await getFormById(parseInt(formId));
  const state : TypeProgress = await getProgressById(form.progressID);

  const content = stateComponentMap[state.title] ?? (
    <p> Hubo en error al cargar tu formulario... </p>
  );

  return (
    <div>
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-[1rem]">Mis Objetivos</h1>
      {/* Subtítulo con dos líneas: Colaborador y Estado */}
      <p className="text-lg">
        Colaborador: {user.fullName}<br/>
        Estado: <span className="text-blue-600">{state.title}</span>
      </p>
      {content}
    </div>
  );
}

export default MisObjetivosPage;
