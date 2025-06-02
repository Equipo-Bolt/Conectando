export interface ObjectiveClassification {
  id: number;
  weight: number | null;
  classificationCatalogID: number;
  createdAt: Date;
  classificationTitle: string;
}

// * Erased Pick interface because of ESlint suggestion
export interface MutateObjectiveClassification {
  id: number;
  weight: number;
}