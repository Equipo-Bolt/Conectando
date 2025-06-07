"use client";
import InfoHover from "@/components/bolt/Icons/InfoHover";

import { getColumns } from "@/components/bolt/DataTables/dataTableObjectivesBossGrade/columns";
import { DataTableCollaboratorObjectives } from "@/components/bolt/DataTables/dataTableObjectivesBossSent/data-table";
import { useState, useCallback, useMemo } from "react";

import { FormObjectives } from "@/types/FormObjectives";
import { Form } from "@/types/Form";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import UpdateProgressButton from "@/components/bolt/Buttons/UpdateProgressButton";
import WeightField from "@/components/bolt/Inputs/WeightField";
import WeightSum from "@/components/bolt/DataTables/WeightSum";

export default function ClientApproved({
  form,
  initialData,
}: {
  form: Form;
  initialData: FormObjectives[];
}) {
  const [data, setData] = useState(initialData);
  const updateWeight = useCallback((id: number, newWeight: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.objectiveClassificationID === id
          ? { ...item, weight: newWeight }
          : item
      )
    );
  }, []);

  const columns = useMemo(
    () => getColumns(form.collaboratorID, false),
    [form.collaboratorID]
  );
  return (
    <div>
      <InfoHover>
        <div className="text-sm mb-[0.5rem]">
          Para habilitar el botón de calificar objetivos es necesario:
        </div>
        <div className="flex flex-col text-sm mb-[0.5rem] ml-[0.5rem] gap-[0.25rem]">
          <div>Calificar cada uno de los objetivos</div>
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
                  id={item.objectiveClassificationID as number}
                  initialWeight={item.weight ?? 0}
                  onWeightChange={updateWeight}
                  disabled={true}
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
          text="Calificar Objetivos"
          form={form}
          formObjectives={data}
          progressID={4}
        />
      </div>
    </div>
  );
}
