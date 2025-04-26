import Borrador from "../../../../components/Borrador";
import EsperandoRevision from "@/components/EsperandoRevision";
import IniciarPropuesta from "@/components/IniciarPropuesta";

export default function MisObjetivosPage() {
  const state: "IniciarPropuesta" | "borrador" | "esperandoRevision" =
    "IniciarPropuesta"; // Cambia esto según el estado que desees mostrar

  let content;

  switch (state) {
    case "borrador":
      content = <Borrador />;
      break;
    case "esperandoRevision":
      content = <EsperandoRevision />;
      break;
    case "IniciarPropuesta":
      content = <IniciarPropuesta />;
      break;
    default:
      content = <p>No content available</p>;
      break;
  }

  return (
    <div>
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-2">Mis Objetivos</h1>
      {/* Subtítulo con dos líneas: Colaborador y Estado */}
      <p className="text-lg mb-4">
        Colaborador: Cristian Peralta<br/>
        Estado: <span className="text-blue-600">Sin iniciar</span>
      </p>
      {content}
    </div>

  );
}

