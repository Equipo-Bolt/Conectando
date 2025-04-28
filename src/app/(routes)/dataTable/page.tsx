"use server";

import { Objectives, columns } from "./columns"
import { DataTable } from "./data-table"

//! Este componente tabla esta sujeto a volverse una tabla universal para que se use en diferentes pantallas

async function getData(): Promise<Objectives[]> {
  const res = await fetch("https://680d2f49c47cb8074d8fcdd8.mockapi.io/Objectives")
  const data = await res.json()
  return data
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold pb-5">Objetivos de Negocio/División</h1>
      <DataTable columns={columns} data={data} />
    </div>
    
  )
}
