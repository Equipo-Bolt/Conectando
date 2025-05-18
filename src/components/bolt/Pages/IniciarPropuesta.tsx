import IniciarPropuestaButton from "@/components/bolt/Buttons/IniciarPropuestaButton";

import { cookies } from "next/headers";

export default async function IniciarPropuesta() {
    //* Usando cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    return (
        <div>
          {/* Caja centrada con mensaje de bienvenida */}
          <div className="shadow-md rounded-lg p-[1rem] text-center w-3/4 mx-auto">
            <p className="mb-2">Bienvenido al nuevo inicio de año 2026.</p>
            <p>Para iniciar tu nueva propuesta de objetivo, presione el siguiente botón.</p>
          </div>

          {/* Botón amarillo con estilo y animación hover */}
          <div className="text-center mt-6">
            <IniciarPropuestaButton userId={Number(userId)}/>
          </div>
      </div>
      );
}
  