"use client";

import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido"),
    roleID: z.string().min(1, "El rol es requerido"),
    employeeNumber: z.string().nullable().optional(),
    fullName: z.string().nullable().optional(),
    bossId: z.string().nullable().optional(),
    division: z.string().nullable().optional(),
    businessUnitId: z.string().nullable().optional(),
    companySeniority: z.string().nullable().optional(),
    positionSeniority: z.string().nullable().optional(),
    areaId: z.string().nullable().optional(),
    position: z.string().nullable().optional(),
    companyContribution: z.string().nullable().optional(),
}).refine((data) => {

    // Check if the employee number is a valid number
    if (!data.employeeNumber) {
        return true; // If employeeNumber is not provided, skip this check
    } else {
        const employeeNumber = parseInt(data.employeeNumber, 10);
        return !isNaN(employeeNumber) && employeeNumber > 0;
    }
}, {

    message: "El id del empleado debe ser un número positivo",

}).refine((data) => {

    // Check if the bossId is a valid number
    if (!data.bossId) {
        return true; // If bossId is not provided, skip this check
    } else {

        const bossId = parseInt(data.bossId, 10);
        return !isNaN(bossId) && bossId > 0;
    }

}, {

    message: "El id del jefe debe ser un número positivo",

}).refine((data) => {

    // Check if the areaId is a valid number
    if (!data.areaId) {
        return true; // If areaId is not provided, skip this check
    } else {
        const areaId = parseInt(data.areaId, 10);
        return !isNaN(areaId) && areaId > 0;
    }
}, {

    message: "El id del área debe ser un número positivo",

}).refine((data) => {

    // Check if the companySeniority is a valid date
    if (!data.companySeniority) {
        return true; // If companySeniority is not provided, skip this check
    } else {
        const companySeniority = new Date(data.companySeniority);
        return !isNaN(companySeniority.getTime()) && companySeniority <= new Date();
    }
}, {
    
    message: "La antigüedad en la empresa debe ser una fecha válida y no puede ser futura",

}).refine((data) => {

    // Check if the positionSeniority is a valid date
    if (!data.positionSeniority) {
        return true; // If positionSeniority is not provided, skip this check
    } else {
        const positionSeniority = new Date(data.positionSeniority);
        return !isNaN(positionSeniority.getTime()) && positionSeniority <= new Date();
    }    
}, {

    message: "La antigüedad en el puesto debe ser una fecha válida y no puede ser futura",
    
});