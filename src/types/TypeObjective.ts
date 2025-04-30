//! Frontend mandate this
export interface TypeObjective {
    id: number
    result: string | null
    grade: number | null
    weight: number //? Francisco: I consider this Mandatory in form, change if not
    title: string //?  Mandatory in form
    goal: string | null
    formID?: number
    createdAt?: Date
    objectiveClassificationID?: number
}