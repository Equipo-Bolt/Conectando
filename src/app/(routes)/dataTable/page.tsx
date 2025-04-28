"use server";

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { TypeFormObjectives } from "@/types/TypeFormObjectives";

//! Este componente tabla esta sujeto a volverse una tabla universal para que se use en diferentes pantallas

export default async function Page() {

  const data = await getObjectivesByFormId(1) as TypeFormObjectives[] // Cambiar el 1 por el id del formulario que se necesite

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold pb-5">Objetivos de Negocio/División</h1>
      <DataTable columns={columns} data={data[0].objectives} />
    </div>
    
  )
}
