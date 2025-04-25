import Borrador from "../../../../components/Borrador";
import EsperandoRevision from "../../../../components/EsperandoRevision";

export default function MisObjetivosPage() {
  return (
    <div className="p-8">
      {/* Título principal */}
      <h1 className="text-3xl font-semibold mb-2">Mis Objetivos</h1>
      {/* Subtítulo con dos líneas: Colaborador y Estado */}
      <p className="text-gray-800 mb-8">
        Colaborador: Cristian Peralta<br/>
        Estado: <span className="text-blue-600">Sin iniciar</span>
      </p>
      {/* Caja centrada con mensaje de bienvenida */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-2xl mx-auto">
        <p className="mb-2">Bienvenido al nuevo inicio de año 2026.</p>
        <p>Para iniciar tu nueva propuesta de objetivo, presione el siguiente botón.</p>
      </div>
      {/* Botón amarillo con estilo y animación hover */}
      <div className="text-center mt-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow-md">
          Iniciar mi propuesta de objetivos
        </button>
      </div>
    </div>
  );
}

