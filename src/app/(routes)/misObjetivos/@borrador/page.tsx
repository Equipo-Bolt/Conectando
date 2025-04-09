import React from "react";
import { Button } from "@/components/ui/button";
const MisObjetivosBorradorPage: React.FC = () => {
  return (
    <div>
      <p>
        Para habilitar el botón envío de tus objetivos a revisión es necesario:
      </p>
      <p>1. Tener tu información de usuario completa.</p>
      <p>
        2. Que la suma de los pesos de las clasifiicaciones de objetivos sea
        igual a 100.
      </p>
      <p>3. Tener al menos un objetivo por cada clasificación de objetivos.</p>
      <p>
        4. Que la suma de pesos de objetivos por cada clasificación sea igual a
        100.
      </p>
      <Button variant={"gemso_yellow"}>Enviar a Evaluación</Button>
    </div>
  );
};

export default MisObjetivosBorradorPage;
