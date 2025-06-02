import InfoHover from "@/components/bolt/Icons/InfoHover";

import { columns } from "@/components/bolt/DataTables/dataTableMyObjectives/columns";
import { DataTableCollaboratorObjectives } from "@/components/bolt/DataTables/dataTableCollaboratorObjectives/data-table";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";

import { FormObjectives } from "@/types/FormObjectives";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import UpdateProgressButton from "@/components/bolt/Buttons/UpdateProgressButton";
import WeightField from "@/components/bolt/Inputs/WeightField";
import WeightSum from "@/components/bolt/DataTables/WeightSum";

interface FeedbackProps {
  userId: number;
}

export default async function Feedback(
  props: FeedbackProps
) {
  console.log("Feedback component props:", props);
  const userFormId = await getFormIdByUserId(Number(props.userId));
  const form = await getFormById(parseInt(userFormId));
  const data = (await getObjectivesByFormId(
    parseInt(userFormId)
  )) as FormObjectives[];

  return (
    <div>
      <InfoHover>
        <div className="text-sm mb-[0.5rem]">
          Para habilitar el envío de sus objetivos a revisión es necesario:
        </div>
        <div className="flex flex-col text-sm mb-[0.5rem] ml-[0.5rem] gap-[0.25rem]">
          <div>1. Tener su información de usuario completa en la página de su perfil.</div>
          <div>
            2. Que la suma de los pesos de las clasificaciones sea
            igual a 100.
          </div>
          <div>
            3. Tener al menos un objetivo por cada clasificación.
          </div>
          <div>
            4. Que el peso total por cada clasificación sea
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
        {data.map((item) => (
          <div key={item.objectiveClassificationID}>
            <h1 className="text-2xl font-bold pb-[1.5rem]">
              {item.classificationTitle}
            </h1>
            <div className="flex flex-row mb-[1rem] w-full">
              <div className="w-2/3">
                <WeightField
                  id={item.objectiveClassificationID as number}
                  initialWeight={item.weight || 1}
                />
              </div>
              <WeightSum objectives={item.objectives} />
            </div>
            <DataTableCollaboratorObjectives
              columns={columns}
              data={item.objectives}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-[1rem]">
        <UpdateProgressButton
          text="Aprobar Objetivos"
          form={form}
          formObjectives={data}
          progressID={3}
        />
      </div>
    </div>
  );
}
