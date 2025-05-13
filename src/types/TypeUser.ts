export interface TypeUser {
    id : number,
    employeeNumber : number,
    fullName? : string, 
    email? : string ,
    jobPosition? : string,
    positionSeniority? : Date,
    companySeniority? : Date,
    companyContribution? : string,
    bossID? : number,
    roleID? : number,
    businessUnitID? : number,
    areaID? : number, 
    createdAt : Date
}