"use client";

import { z } from "zod";

export const completeUserInfoSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido"),
    roleID: z.number().min(1, "El rol es requerido"),
    employeeNumber: z.number().min(1, "El número de empleado debe ser un número positivo"),
    fullName: z
        .string()
        .min(1, "El nombre completo es requerido")
        .regex(/^[a-zA-Z\s]+$/, "El nombre completo solo puede contener letras y espacios"),
    bossID: z.number().min(1, "El jefe debe ser un número positivo"),
    divisionID: z.number().min(1, "La división debe ser un número positivo"),
    businessUnitID: z.number().min(1, "La unidad de negocio debe ser un número positivo"),
    companySeniority: z.coerce.date().refine(
        (val) => !isNaN(val.getTime()) && val <= new Date(),
        {
            message: "La antigüedad en la empresa debe ser una fecha válida y no futura",
        }
    ),
    positionSeniority: z.coerce.date().refine(
        (val) => !isNaN(val.getTime()) && val <= new Date(),
        {
            message: "La antigüedad en el puesto debe ser una fecha válida y no futura",
        }
    ),
    areaID: z.number().min(1, "El área debe ser un número positivo"),
    position: z.string().min(1, "El puesto es requerido"),
    companyContribution: z
        .string()
        .min(1, "La contribución a la empresa es requerida")
        .max(300, "La contribución a la empresa no puede exceder los 300 caracteres"),
});

export const createUserSchema = completeUserInfoSchema.extend({
    employeeNumber: z.number().optional(),
    fullName: z.string().optional(),
    bossID: z.number().optional(),
    divisionID: z.number().optional(),
    businessUnitID: z.number().optional(),
    companySeniority: z.coerce.date().optional(),
    positionSeniority: z.coerce.date().optional(),
    areaID: z.number().optional(),
    position: z.string().optional(),
    companyContribution: z.string().optional(),
});

export const updateUserSchema = createUserSchema.extend({
    id: z.number(),
});
