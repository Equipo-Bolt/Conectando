//! Fronted decides this
export interface TypeForm {
    id: number
    approvedAt: Date | null
    gradedAt: Date | null
    collaboratorID: number
    evaluatorID: number
    progressID: number
    createdAt: Date
}