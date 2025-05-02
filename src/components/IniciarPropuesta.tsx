import IniciarPropuestaButton from "./IniciarPropuestaButton";

export default function IniciarPropuesta() {
    return (
        <div>
          {/* Caja centrada con mensaje de bienvenida */}
          <div className="shadow-md rounded-lg p-[1rem] text-center w-3/4 mx-auto">
            <p className="mb-2">Bienvenido al nuevo inicio de año 2026.</p>
            <p>Para iniciar tu nueva propuesta de objetivo, presione el siguiente botón.</p>
          </div>

          {/* Botón amarillo con estilo y animación hover */}
          <div className="text-center mt-6">
            <IniciarPropuestaButton />
          </div>
      </div>
      );
}
  