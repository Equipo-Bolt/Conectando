import { TypeComment } from "./TypeComment";

//! El primer interface se utiliza en DataTables
export interface TypeObjective {
    id: number;
    result: string | null;
    grade: number | null;
    weight: number;
    title: string;
    goal: string | null;
    formID?: number;
    createdAt?: Date;
    objectiveClassificationID?: number;
    comments?: TypeComment[];
}
//! Este interface se utiliza para crear o editar Objetivos, (createObjetive & updateObjective)
export interface MutateObjectiveInfo //* Con Pick<> podemos agarrar solo la info útil
    extends Pick<TypeObjective, "formID" | "title" | "goal" | "result" | "weight"> {
    id?: number,
    classificationCatalogID: number; //? Este es el id del menú desplegable de clasificaciones
}
