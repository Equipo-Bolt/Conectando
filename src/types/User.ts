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