import { cookies } from "next/headers";

import InfoHover from "@/components/bolt/Icons/InfoHover";

import { columns } from "@/components/bolt/DataTables/dataTableMisObjetivos/columns";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";

import { FormObjectives } from "@/types/FormObjectives";

import { Button } from "@/components/ui/button";
import UpdateProgressButton from "@/components/bolt/Buttons/UpdateProgressButton";
import WeightField from "@/components/bolt/Inputs/WeightField";
import { DataTableMisObjetivos } from "@/components/bolt/DataTables/dataTableMisObjetivos/data-table";

import Link from "next/link";


export default async function Borrador() {
  //* Usando cookies
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  const formId : string =  await getFormIdByUserId(Number(userId)); //? maybe avoid calling func again and just set cookie?
  const form = await getFormById(Number(formId));
  const data = (await getObjectivesByFormId(Number(formId))) as FormObjectives[]; 

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

      <p className="text-xs">
        * En caso de actualizar el peso de la clasificación, es necesario
        refrescar la pagina para poder enviar los objetivos a revisión.
      </p>

      <div className="flex justify-end mb-[1rem]">
        <Button variant={"gemso_blue"} asChild>
          <Link href={"/misObjetivos/crear"}>Agregar Objetivo</Link>
        </Button>
      </div>
      <div className="container mx-auto">
        {data.map((item, index) => (
          <div key={index}>
            <h1 className="text-2xl font-bold pb-[1.5rem]">
              {item.classificationTitle}
            </h1>
            <div className= "flex flex-row mb-[1rem] w-full">
                <div className="w-2/3">
                  <WeightField id={item.objectiveClassificationID as number} initialWeight={item.weight || 1}/>
                </div>
            </div>

            <DataTableMisObjetivos columns={columns} data={item.objectives} />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-[1rem]">
          <UpdateProgressButton
            text="Enviar A Revisión"
            form={form}
            formObjectives={data}
            progressID={2}
          />
      </div>
    </div>
  );
}
