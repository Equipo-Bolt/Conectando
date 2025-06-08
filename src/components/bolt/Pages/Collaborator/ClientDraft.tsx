"use client";

import React, { useState } from "react";
import WeightField from "@/components/bolt/Inputs/WeightField";
import { DataTableMyObjectives } from "@/components/bolt/DataTables/dataTableMyObjectives/data-table";
import WeightSum from "@/components/bolt/DataTables/WeightSum";
import UpdateProgressButton from "@/components/bolt/Buttons/UpdateProgressButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getColumns } from "@/components/bolt/DataTables/dataTableMyObjectives/columns";
import { FormObjectives } from "@/types/FormObjectives";
import { Form } from "@/types/Form";
import SimpleStaticTable from "@/components/bolt/DataTables/dataTableGradeWeight/data-table";
import InfoHover from "@/components/bolt/Icons/InfoHover";
export default function ClientDraft({
  form,
  initialData,
}: {
  form: Form;
  initialData: FormObjectives[];
}) {
  const [data, setData] = useState(initialData);
  const columns = getColumns(true);

  // Updates the weight
  const updateWeight = (id: number, newWeight: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.objectiveClassificationID === id
          ? { ...item, weight: newWeight }
          : item
      )
    );
  };

  return (
    <div>
      <InfoHover>
        <div className="text-sm mb-[0.5rem]">
          Para habilitar el envío de sus objetivos a revisión es necesario:
        </div>
        <div className="flex flex-col text-sm mb-[0.5rem] ml-[0.5rem] gap-[0.25rem]">
          <div>
            1. Tener su información de usuario completa en la página de su
            perfil.
          </div>
          <div>
            2. Que la suma de los pesos de las clasificaciones sea igual a 100.
          </div>
          <div>3. Tener al menos un objetivo por cada clasificación.</div>
          <div>
            4. Que el peso total por cada clasificación sea igual a 100.
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
            <div className="flex flex-row mb-[1rem] w-full">
              <div className="w-2/3">
                <WeightField
                  id={item.objectiveClassificationID ?? 0}
                  initialWeight={item.weight}
                  onWeightChange={updateWeight}
                />
              </div>
              <div className="flex gap-5">
                <WeightSum objectives={item.objectives} />
              </div>
            </div>

            <DataTableMyObjectives columns={columns} data={item.objectives} />
          </div>
        ))}
      </div>
      <div className="text-2xl font-bold pb-[1.5rem]">Sumatorias</div>
      <SimpleStaticTable data={data} />
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
