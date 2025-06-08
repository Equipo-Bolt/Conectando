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
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "El nombre completo solo puede contener letras y espacios y acents"),
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
        })
        .optional().or(z.literal("")),
    fullName: z
        .string()
        .min(1, "El nombre completo es requerido")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, "El nombre completo solo puede contener letras y espacios")
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
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
        })
        .optional().or(z.literal("")),
    position: z.string().min(1, "El puesto es requerido").optional().or(z.literal("")),
    companyContribution: z
        .string()
        .min(1, "La contribución a la empresa es requerida")
        .max(300, "La contribución a la empresa no puede exceder los 300 caracteres")
        .optional().or(z.literal("")),
})

export const updateUserSchema = createUserSchema.extend({
    id: z.number(),
});

export const completeUserInfoSchema = userSchema.extend({
    id: z.number(),
})