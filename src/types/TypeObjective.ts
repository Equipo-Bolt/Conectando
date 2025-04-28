//! Frontend mandate this
export interface TypeObjective {
    id: number
    result: string | null
    grade: number | null
    weight: number
    title: string
    goal: string | null
    formID?: number
    createdAt?: Date
    objectiveClassificationID?: number
}