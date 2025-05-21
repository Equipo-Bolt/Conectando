export interface Comment {
  id: number;
  description: string;
  commentedAt?: Date;
  objectiveID: number;
  commenterID: number;
  createdAt: Date;
}

export interface MutateComment
  extends Pick<Comment, "description">{
    id?: number,
    objectiveID?: number,
    commenterID?: number;
}