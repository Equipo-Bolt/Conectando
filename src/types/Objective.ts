import { Comment } from "./Comment";

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
 */
export interface MutateObjectiveInfo
  extends Pick<Objective, "formID" | "title" | "goal" | "result" | "weight"> {
  id?: number;
  classificationCatalogID: number; // * This is the id to be used in the Classification Dropdown Menu
}
