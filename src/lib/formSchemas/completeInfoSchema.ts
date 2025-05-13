"use client";

import { z } from "zod";

export const completeInfoSchema = z.object({

    employeeNumber: z.string().min(1, { message: "El id del empleado es requerido" }),
    email: z.string().email({ message: "El correo electrónico no es válido" }),
    fullName: z.string().min(1, { message: "El nombre completo es requerido" }),
    bossId: z.string().min(1, { message: "El id del jefe es requerido" }),
    division: z.string().min(1, { message: "La división es requerida" }),
    businessUnitId: z.string().min(1, { message: "La unidad de negocio es requerida" }),
    companySeniority: z.string().min(1, { message: "La antigüedad en la empresa es requerida" }),
    positionSeniority: z.string().min(1, { message: "La antigüedad en el puesto es requerida" }),
    areaId: z.string().min(1, { message: "El id del área es requerido" }),
    position: z.string().min(1, { message: "El puesto es requerido" }),
    companyContribution: z.string().min(1, { message: "La contribución a la empresa es requerida" }),

}).refine((data) => {

    // Check if the employee number is a valid number

    const employeeNumber = parseInt(data.employeeNumber, 10);
    return !isNaN(employeeNumber) && employeeNumber > 0;

}, {

    message: "El id del empleado debe ser un número positivo",

}).refine((data) => {

    // Check if the bossId is a valid number
    
    const bossId = parseInt(data.bossId, 10);
    return !isNaN(bossId) && bossId > 0;

}, {

    message: "El id del jefe debe ser un número positivo",

}).refine((data) => {

    // Check if the areaId is a valid number

    const areaId = parseInt(data.areaId, 10);
    return !isNaN(areaId) && areaId > 0;

}, {

    message: "El id del área debe ser un número positivo",

}).refine((data) => {

    // Check if the companySeniority is a valid date

    const companySeniority = new Date(data.companySeniority);
    return !isNaN(companySeniority.getTime()) && companySeniority <= new Date();

}, {
    
    message: "La antigüedad en la empresa debe ser una fecha válida y no puede ser futura",

}).refine((data) => {

    // Check if the positionSeniority is a valid date

    const positionSeniority = new Date(data.positionSeniority);
    return !isNaN(positionSeniority.getTime()) && positionSeniority <= new Date();
    
}, {

    message: "La antigüedad en el puesto debe ser una fecha válida y no puede ser futura",
    
});