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
  comments?: Comment[];
}
/**
 * ! In the future this type should be replaced by Zod schemas
 * * Currently being used in CreateObjectiveAction and misObjetivos/crear/page.tsx and also in UpdateObjectiveAction and misObjetivos/editar/page.tsx
 * ! IT WAS ALSO BEING USED IN misObjetivos/detalles/[id]/page.tsx AND ObjectiveDetails
 */

export type CreateObjectiveFormData = z.infer<typeof createObjectiveSchema>;
export type UpdateObjectiveFormData = z.infer<typeof updateObjectiveSchema>;
