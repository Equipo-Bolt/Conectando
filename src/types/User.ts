import { z } from "zod";
import { completeInfoSchema } from "@/lib/formSchemas/completeInfoSchema";

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
  areaID?: number;
  createdAt: Date;
}

export interface MutateUser{
    email: string,
    roleID: number
}

// ! used in fetches/user/getInfoStatusOfUser()
export type InfoStatus = "Completed" | "NotCompleted";

export type CompleteInfoSchemaType = z.infer<typeof completeInfoSchema>;