import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";
import { TypeObjective } from "@/types/TypeObjective";
import { TypeObjectiveClassification } from "@/types/TypeObjectiveClassification";
import CancelButton from "./CancelButton";

interface Comentario {
  autor: string;
  fecha: string;
  texto: string;
}

interface Props {
  objetivo: TypeObjective;
}

export default async function DetallesObjetivo({ objetivo }: Props) {
  const classification: TypeObjectiveClassification = await getObjectiveClassificationById(objetivo.objectiveClassificationID as number);

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Detalles del Objetivo</h1>
      <p className="text-base"><strong>Colaborador:</strong> Daniel Fernández</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">Título del Objetivo</label>
              <input disabled value={objetivo.title} className="border rounded p-2 w-full bg-gray-100" />
            </div>

            <div>
              <label className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">Clasificación</label>
              <input disabled value={classification.classificationTitle} className="border rounded p-2 w-full bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">Peso</label>
              <input disabled value={objetivo.weight} className="border rounded p-2 w-full bg-gray-100" />
            </div>
          </div>

          <div>
            <label className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4 ">Meta</label>
            <textarea disabled value={objetivo.goal ?? ""} className="border rounded p-2 w-full bg-gray-100" />
          </div>
        </div>


        <div className="space-y-4 border-l pl-4">
          <h2 className="text-lg font-semibold">Comentarios</h2>
          {objetivo.comments && objetivo.comments?.length > 0 ? (
            objetivo.comments.map((c, i) => (
              <div key={i} className="border rounded p-3 bg-gray-50 text-sm">
                <strong>{"John"}</strong> <span className="text-gray-500">{c.commentedAt?.toDateString()}</span>
                <p>{c.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Sin comentarios</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 w-full">
        <button className="bg-gemso-blue w-[10rem] h-[3rem] rounded-lg font-bold text-m text-white hover:bg-gemso-blue/90">Editar Objetivo</button>
        <CancelButton route="/misObjetivos" text="Regresar"></CancelButton>
      </div>
    </div>
  );
}
