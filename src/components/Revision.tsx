import InfoHover from "@/components/InfoHover";

import { columns } from "@/components/dataTableObjetivosColaborador/columns";
import { DataTableObjColaborador } from "@/components/dataTableObjetivosColaborador/data-table";

import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";

import { TypeFormObjectives } from "@/types/TypeFormObjectives";

import { Button } from "./ui/button";
import Link from "next/link";

export default async function Revision() {
  const data = (await getObjectivesByFormId(1)) as TypeFormObjectives[]; //! default 1

  return (
    <div>
      <InfoHover>
        <div className="text-sm mb-[0.5rem]">
          Para habilitar el envío de tus objetivos a revisión es necesario:
        </div>
        <div className="flex flex-col text-sm mb-[0.5rem] ml-[0.5rem] gap-[0.25rem]">
          <div>1. Tener tu información de usuario completa.</div>
          <div>
            2. Que la suma de los pesos de las clasificaciones de objetivos sea
            igual a 100.
          </div>
          <div>
            3. Tener al menos un objetivo por cada clasificación de objetivo.
          </div>
          <div>
            4. Que la suma de los pesos de objetivos por cada clasificación sea
            igual a 100.
          </div>
        </div>
      </InfoHover>

      <div className="flex justify-end mb-[1rem]">
        <Button variant={"gemso_blue"} asChild>
          <Link href={"/misObjetivos/crear"}>Agregar Objetivo</Link>
        </Button>
      </div>
      <div className="container mx-auto">
        {data.map((item) => (
          <div key={item.objectiveClassificationID}>
            <h1 className="text-2xl font-bold pb-[1.5rem]">
              {item.classificationTitle}
            </h1>

            <DataTableObjColaborador columns={columns} data={item.objectives} />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-[1rem]">
        <Button variant={"gemso_yellow"}>Aprobar Objetivos</Button>
      </div>
    </div>
  );
}
