//! Fronted rules
export interface TypeObjectiveClassification {
    id: number
    weight: number | null
    classificationID: number
    createdAt: Date
    classificationTitle : string
}

export interface MutateObjectiveClassificationInfo 
    extends Pick<TypeObjectiveClassification, "id" | "weight"> {}