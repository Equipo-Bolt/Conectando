import { TypeObjective } from "@/types/TypeObjective";

interface Comentario {
  autor: string;
  fecha: string;
  texto: string;
}

interface Props {
  objetivo: TypeObjective & {
    classification: string;
    comentarios: Comentario[];
  };
}

const DetallesObjetivo = ({ objetivo }: Props) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Detalles del Objetivo</h1>
      <p className="mb-2"><strong>Colaborador:</strong> Daniel Fernández</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm text-gray-500">Título del Objetivo</label>
          <input disabled value={objetivo.title} className="border rounded p-2 w-full" />
        </div>

        <div>
          <label className="text-sm text-gray-500">Clasificación</label>
          <input disabled value={objetivo.classification} className="border rounded p-2 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm text-gray-500">Peso</label>
          <input disabled value={objetivo.weight} className="border rounded p-2 w-full" />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm text-gray-500">Meta</label>
        <textarea disabled value={objetivo.goal ?? ""} className="border rounded p-2 w-full" />
      </div>

      <div className="border-l-2 pl-4">
        <h2 className="font-semibold mb-2">Comentarios</h2>
        {objetivo.comentarios?.length > 0 ? (
          objetivo.comentarios.map((c, i) => (
            <div key={i} className="mb-4 text-sm">
              <strong>{c.autor}</strong> <span className="text-gray-500">{c.fecha}</span>
              <p>{c.texto}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Sin comentarios</p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button className="bg-blue-600 text-white rounded px-4 py-2 w-40">Editar Objetivo</button>
        <button className="border border-blue-600 text-blue-600 rounded px-4 py-2 w-40">Añadir Comentario</button>
      </div>
    </div>
  );
};

export default DetallesObjetivo;
