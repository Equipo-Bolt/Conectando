import { User } from "./User";

export interface Comment {
  id: number;
  description: string;
  commentedAt: Date | null;
  objectiveID: number;
  commenterID: number;
  createdAt: Date;
  commenter?: User
}

export interface MutateComment
  extends Pick<Comment, "description">{
    id?: number,
    objectiveID?: number,
    commenterID?: number;
}