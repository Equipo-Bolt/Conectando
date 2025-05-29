import { z } from "zod";

import { createUserSchema } from "@/lib/formSchemas/userSchema";
import { updateUserSchema } from "@/lib/formSchemas/userSchema";
import { completeInfoSchema } from "@/lib/formSchemas/completeInfoSchema";

export interface User {
  id: number;
  employeeNumber?: number;
  fullName?: string;
  email: string;
  jobPosition?: string;
  positionSeniority?: Date;
  companySeniority?: Date;
  companyContribution?: string;
  bossID?: number;
  roleID: number;
  businessUnitID?: number;
  divisionID?: number;
  areaID?: number;
  createdAt: Date;
}

// ! used in fetches/user/getInfoStatusOfUser()
export type InfoStatus = "Completed" | "NotCompleted";

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type CompleteInfoSchemaType = z.infer<typeof completeInfoSchema>;