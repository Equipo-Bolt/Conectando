import { z } from "zod";
import { BusinessUnit } from "./BusinessUnit";

import { createUserSchema } from "@/lib/Schemas/formSchemas/userSchema";
import { updateUserSchema } from "@/lib/Schemas/formSchemas/userSchema";
import { completeUserInfoSchema } from "@/lib/Schemas/formSchemas/userSchema";

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
  businessUnit?: BusinessUnit;
}

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type CompleteUserFormData = z.infer<typeof completeUserInfoSchema>;