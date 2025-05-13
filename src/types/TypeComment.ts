//! Frontend should modify to fit their need
export interface TypeComment {
    id: number;
    description: string;
    commentedAt?: Date;
    objectiveID: number;
    createdAt: Date;
}