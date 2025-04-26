import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IniciarPropuesta() {
    return (
        <div>
          {/* Caja centrada con mensaje de bienvenida */}
          <div className="shadow-md rounded-lg p-[1rem] text-center">
            <p className="mb-2">Bienvenido al nuevo inicio de año 2026.</p>
            <p>Para iniciar tu nueva propuesta de objetivo, presione el siguiente botón.</p>
          </div>

          {/* Botón amarillo con estilo y animación hover */}
          <div className="text-center mt-6">
            <Button className="bg-gemso-yellow hover:bg-gemso-yellow/90 text-white font-bold py-2 px-4 rounded shadow-md">
              <Link href="/propuestaObjetivo" className="text-white font-bold">
                Iniciar mi propuesta de objetivos
              </Link>
            </Button>
          </div>
      </div>
      );
}
  