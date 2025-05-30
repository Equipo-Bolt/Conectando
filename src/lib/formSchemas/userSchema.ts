import { z } from "zod";


export const userSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido"),
    roleID: z
        .string()
        .min(1, "El rol es requerido")
        .refine((val) => {
            // Check if the roleID is a valid number
            const roleID = parseInt(val, 10);
            return !isNaN(roleID) && roleID > 0;
        }
        , {
            message: "El rol debe ser un número positivo",
        }),
    employeeNumber: z
        .string()
        .min(1, "El número de empleado es requerido")
        .refine((val) => {
            // Check if the employee number is a valid number
            const employeeNumber = parseInt(val, 10);
            return !isNaN(employeeNumber) && employeeNumber > 0;
        }
        , {
            message: "El número de empleado debe ser un número positivo",
        }),
    fullName: z
        .string()
        .min(1, "El nombre completo es requerido")
        .regex(/^[a-zA-Z\s]+$/, "El nombre completo solo puede contener letras y espacios"),
    bossID: z
        .string()
        .min(1, "El jefe es requerido")
        .refine((val) => {
            // Check if the bossID is a valid number
            const bossID = parseInt(val, 10);
            return !isNaN(bossID) && bossID > 0;
        }
        , {
            message: "El jefe debe ser un número positivo",
        }),
    divisionID: z
        .string()
        .min(1, "La división es requerida")
        .refine((val) => {
            // Check if the divisionID is a valid number
            const divisionID = parseInt(val, 10);
            return !isNaN(divisionID) && divisionID > 0;
        }
        , {
            message: "La división debe ser un número positivo",
        }),
    businessUnitID: z
        .string()
        .min(1, "La unidad de negocio es requerida")
        .refine((val) => {
            // Check if the businessUnitID is a valid number
            const businessUnitID = parseInt(val, 10);
            return !isNaN(businessUnitID) && businessUnitID > 0;
        }
        , {
            message: "La unidad de negocio debe ser un número positivo",
        }),
    companySeniority: z
        .string()
        .min(1, "La antigüedad en la empresa es requerida")
        .refine((val) => {
            // Check if the companySeniority is a valid date
            // Assuming the date is in YYYY-MM-DD format
            const companySeniority = new Date(val);
            return !isNaN(companySeniority.getTime()) && companySeniority <= new Date();
            }
            , {
            message: "La antigüedad en la empresa debe ser una fecha válida y no futura",
        }),
    positionSeniority: z
        .string()
        .min(1, "La antigüedad en el puesto es requerida")
        .refine((val) => {
            // Check if the positionSeniority is a valid date
            // Assuming the date is in YYYY-MM-DD format
            const positionSeniority = new Date(val);
            return !isNaN(positionSeniority.getTime()) && positionSeniority <= new Date();
            }
            , {
            message: "La antigüedad en el puesto debe ser una fecha válida y no futura",
        }),
    areaID: z.
        string().min(1, "El área es requerida")
        .refine((val) => {
            // Check if the areaID is a valid number
            // Assuming areaID is a string that can be converted to a number
            const areaID = parseInt(val, 10);
            return !isNaN(areaID) && areaID > 0;
        }
        , {
            message: "El área debe ser un número positivo",
        }),
    position: z.string().min(1, "El puesto es requerido"),
    companyContribution: z
        .string()
        .min(1, "La contribución a la empresa es requerida")
        .max(300, "La contribución a la empresa no puede exceder los 300 caracteres"),
})

export const createUserSchema = userSchema.extend({
    employeeNumber: z.string().optional(),
    fullName: z.string().optional(),
    bossID: z.string().optional(),
    divisionID: z.string().optional(),
    businessUnitID: z.string().optional(),
    companySeniority: z.string().optional(),
    positionSeniority: z.string().optional(),
    areaID: z.string().optional(),
    position: z.string().optional(),
    companyContribution: z.string().optional(),
})

export const updateUserSchema = createUserSchema.extend({
    id: z.number(),
});

export const completeUserInfoSchema = userSchema.extend({
    id: z.number(),
})