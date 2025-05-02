import InfoHover from "@/components/InfoHover";

import { columns } from "@/components/dataTable/columns";
import { DataTable } from "@/components/dataTable/data-table";

import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { TypeFormObjectives } from "@/types/TypeFormObjectives";
export default async function Borrador() {
  const data = (await getObjectivesByFormId(1)) as TypeFormObjectives[];
  return (
    <div>
      <InfoHover>
        <div className="text-sm mb-[1rem]">
          Para habilitar el envío de tus objetivos a revisión es necesario:
        </div>
        <div className="text-sm ml-2 space-y-1">
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
      <div className="container mx-auto py-10">
        {data.map((item, index) => (
          <div key={index}>
            <h1 className="text-2xl font-bold pb-5">
              {item.classificationTitle || "Objetivos de Negocio/División"}
            </h1>
            {item.objectives.length > 0 ? (
              <DataTable columns={columns} data={item.objectives} />
            ) : (
              <p>No hay datos</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
