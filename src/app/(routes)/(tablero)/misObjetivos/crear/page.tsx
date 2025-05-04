
/** 
 * * EJEMPLO DE USO DE CREAR OBJETIVO 
 * 
 * * Francisco: Aqui dani te dejo el ejemplo de como crear un objetivo con la funcion que te hice
 * * y usando el hook useActionState para ver como va la peticion
 * 
 * * No tienes que seguir exactamente todo lo que puse nomas es de ejemplo
 */
"use client"

//* importas estos:
import { useActionState, useTransition } from "react";

import SubmitButton from "@/components/SubmitButton" //! el boton que gustes
import { MutateObjectiveInfo } from "@/types/TypeObjective";
import { createObjectiveAction } from "@/app/actions/objective/createObjective";
import { updateObjectiveAction } from "@/app/actions/objective/updateObjective";

//* con la data del form deberas crear un objetivo con esta data
const newOBJ : MutateObjectiveInfo= {
  //* id: 11, lo puse para probar update
  goal: null, //! cambias los valores por los del form
  result: null,
  weight: 70,
  title: "Nada",
  classificationCatalogID: 2, //! este será el id de la clasificacion del dropdown
  formID: 1,
};


const PaginaParaCrearObjetivo = () => {

  //!Usando useActionState y useTransition link a la doc: https://es.react.dev/reference/react/useActionState y https://es.react.dev/reference/react/useTransition

  //*const [ state, newAction ] = useActionState(updateObjectiveAction, null);

  const [ state, newAction] = useActionState(createObjectiveAction, null) //* pones la action aqui
  const [isPending, startTransition] = useTransition();

  //! Hay mil maneras de que jale, hasta nos podemos saltar el hook de useTranstion
  return (
  <>
    <h1>Página para Crear Objetivo</h1>
    <SubmitButton onSubmit={() => startTransition(() => newAction(newOBJ))} text="Crear Objetivo" />
    {isPending ? <p>Creando Objetivo...</p> : <></>} {/* Usa isPending como loading*/}
    <h1>Resultado: <b>{state}</b></h1>     {/* usa state para ver si se creo o no */}
  </>);
};

export default PaginaParaCrearObjetivo;
