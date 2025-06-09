"use client";

import React, { useState } from "react";
import WeightField from "@/components/bolt/Inputs/WeightField";
import { DataTableMyObjectives } from "@/components/bolt/DataTables/dataTableMyObjectives/data-table";
import SimpleStaticTable from "@/components/bolt/DataTables/dataTableGradeWeight/data-table";
import WeightSum from "@/components/bolt/DataTables/WeightSum";

import { getColumns } from "@/components/bolt/DataTables/dataTableObjectivesCollaboratorApproved/columns";
import { FormObjectives } from "@/types/FormObjectives";
import { Form } from "@/types/Form";

import InfoHover from "@/components/bolt/Icons/InfoHover";
export default function ClientApproved({
  form,
  initialData,
}: {
  form: Form;
  initialData: FormObjectives[];
}) {
  const [data, setData] = useState(initialData);
  const columns = getColumns(false);
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
        <div className="flex justify-evenly text-sm mb-[0.5rem] max-w-[30.5rem]">
          
          Sus objetivos han sido aprobados.<br />
          Es importante agregar el resultado de cada uno de ellos antes de la evaluación final de sus
          objetivos. Su jefe directo le citará a una junta 1 a 1 para la
          evaluación final.
        </div>
      </InfoHover>

      <div className="container mx-auto mt-[2rem]">
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
                  disabled={true}
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

    </div>
  );
}
