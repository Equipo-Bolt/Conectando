export interface Form {
  id: number;
  approvedAt: Date | null;
  gradedAt: Date | null;
  collaboratorID: number;
  evaluatorID: number;
  progressID: number;
  createdAt: Date;
}

export interface MutateForm extends Pick<Form, "id" | "progressID"> {
  approvedAt?: Date | null;
  gradedAt?: Date | null;
}
