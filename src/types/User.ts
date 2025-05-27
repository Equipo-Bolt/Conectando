import { z } from "zod";

import { createUserSchema } from "@/lib/formSchemas/userSchema";

export interface User {
  id: number;
  employeeNumber: number;
  fullName?: string;
  email?: string;
  jobPosition?: string;
  positionSeniority?: Date;
  companySeniority?: Date;
  companyContribution?: string;
  bossID?: number;
  roleID?: number;
  businessUnitID?: number;
  divisionID?: number;
  areaID?: number;
  createdAt: Date;
}

export type CreateUserFormData = z.infer<typeof createUserSchema>;