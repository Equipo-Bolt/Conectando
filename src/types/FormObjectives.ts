import { Objective } from "./Objective";

export interface FormObjectives {
  classificationTitle: string;
  weight: number | 0;
  objectiveClassificationID: number | null;
  objectives: Objective[];
}