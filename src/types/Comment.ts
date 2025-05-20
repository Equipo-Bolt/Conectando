export interface Comment {
  id: number;
  description: string;
  commentedAt?: Date;
  objectiveID: number;
  createdAt: Date;
}
