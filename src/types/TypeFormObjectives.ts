//! This interface is the type a page with a Data Table will receive, it will receive an array o this type
import { TypeObjective } from "./TypeObjective"

export interface TypeFormObjectives {
    classificationTitle : string,
    weight : number,
    objectiveClassificationID : number,
    objectives : TypeObjective[]
}

/**
 * { "Objetivos de Negocio",
 *    70,
 *     1,
 *    objectives: 
 *  {Objetivo 1, Objetivo 2}
 * }
 */