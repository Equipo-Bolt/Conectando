import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import InfoHover from "./infoHover";

export default function Borrador() {
  return (
    <div>
      <div className="font-semibold text-lg text-gemso-blue">
        Estado: Borrador
      </div>

      <InfoHover>
        <div className="text-sm mb-2">
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
    </div>
  );
}
