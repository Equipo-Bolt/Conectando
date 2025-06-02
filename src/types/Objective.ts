import { z } from "zod";

import { Comment } from "./Comment";
import { createObjectiveSchema, updateObjectiveSchema} from "@/lib/formSchemas/objectiveSchema";

export interface Objective {
  id: number;
  result: string | null;
  grade: number | null;
  weight: number;
  title: string;
  goal: string | null;
  formID?: number;
  createdAt?: Date;
  objectiveClassificationID: number;
  comments: Comment[];
}

export type CreateObjectiveFormData = z.infer<typeof createObjectiveSchema>;
export type UpdateObjectiveFormData = z.infer<typeof updateObjectiveSchema>;
