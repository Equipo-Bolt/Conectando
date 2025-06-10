import { z } from "zod";
import { isBefore } from "date-fns";

export const userSchema = z.object({
    email: z
        .string()
        .email("El correo electrónico debe ser válido")
        .min(1, "El correo electrónico es requerido"),
    roleID: z
        .string()
        .min(1, "El rol es requerido")
        .refine((val) => {
            const roleID = parseInt(val, 10);
            return !isNaN(roleID) && roleID > 0;
        }, {
            message: "El rol debe ser un número positivo",
        }),
    employeeNumber: z
        .string()
        .min(1, "El número de empleado es requerido")
        .refine((val) => {
            const employeeNumber = parseInt(val, 10);
            return !isNaN(employeeNumber) && employeeNumber > 0;
        }, {
            message: "El número de empleado debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    fullName: z
        .string()
        .min(1, "El nombre completo es requerido")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "El nombre completo solo puede contener letras, espacios y acentos")
        .optional()
        .or(z.literal("")),
    bossID: z
        .string()
        .min(1, "El jefe es requerido")
        .refine((val) => {
            const bossID = parseInt(val, 10);
            return !isNaN(bossID) && bossID > 0;
        }, {
            message: "El jefe debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    divisionID: z
        .string()
        .min(1, "La división es requerida")
        .refine((val) => {
            const divisionID = parseInt(val, 10);
            return !isNaN(divisionID) && divisionID > 0;
        }, {
            message: "La división debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    businessUnitID: z
        .string()
        .min(1, "La unidad de negocio es requerida")
        .refine((val) => {
            const businessUnitID = parseInt(val, 10);
            return !isNaN(businessUnitID) && businessUnitID > 0;
        }, {
            message: "La unidad de negocio debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    companySeniority: z
        .string()
        .min(1, "La fecha de inicio en la empresa es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La fecha de inicio en la empresa debe ser una fecha válida",
        })
        .optional()
        .or(z.literal("")),
    positionSeniority: z
        .string()
        .min(1, "La fecha de inicio en el puesto es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La fecha de inicio en el puesto debe ser una fecha válida",
        })
        .optional()
        .or(z.literal("")),
    areaID: z
        .string()
        .min(1, "El área es requerida")
        .refine((val) => {
            const areaID = parseInt(val, 10);
            return !isNaN(areaID) && areaID > 0;
        }, {
            message: "El área debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    position: z
        .string()
        .min(1, "El puesto es requerido")
        .optional()
        .or(z.literal("")),
    companyContribution: z
        .string()
        .min(1, "La contribución a la empresa es requerida")
        .max(300, "La contribución a la empresa no puede exceder los 300 caracteres")
        .optional()
        .or(z.literal("")),
});

export const createUserSchema = userSchema.refine((data) => {
    // Ensure that companySeniority is before positionSeniority
    if (data.companySeniority && data.positionSeniority) {
        const companyDate = new Date(data.companySeniority);
        const positionDate = new Date(data.positionSeniority);
        return isBefore(companyDate, positionDate) || companyDate.getTime() === positionDate.getTime();
    }
    return true;
}, {
    message: "Esta fecha debe ser previa o igual a la fecha de inicio en la empresa",
    path: ["positionSeniority"], // This helps identify which field has the error
});

export const updateUserSchema = userSchema.extend({
    id: z.number(),
    businessUnit: z.object({
        id: z.number(),
        title: z.string(),
        divisionID: z.number()
    }).optional(),

}).refine((data) => {
    // Ensure that companySeniority is before positionSeniority
    if (data.companySeniority && data.positionSeniority) {
        const companyDate = new Date(data.companySeniority);
        const positionDate = new Date(data.positionSeniority);
        return isBefore(companyDate, positionDate) || companyDate.getTime() === positionDate.getTime();
    }
    return true;
}, {
    message: "Esta fecha debe ser previa o igual a la fecha de inicio en la empresa",
    path: ["positionSeniority"], // This helps identify which field has the error
}).refine((data) => {
    // Ensure that if there is a divisionID there is also a businessUnitID
    if (data.divisionID && !data.businessUnitID) {
        return false;
    }
    // Ensure that if there is a businessUnitID there is also a divisionID
    if (data.businessUnitID && !data.divisionID) {
        return false;
    }
    return true;
}, {
    message: "Si se proporciona una división, también debe proporcionarse una unidad de negocio",
    path: ["divisionID"],
});

export const completeUserInfoSchema = z.object({
    id: z.number(),
    email: z.string().email("El correo electrónico debe ser válido"),
    roleID: z
        .string()
        .min(1, "El rol es requerido")
        .refine((val) => {
            const roleID = parseInt(val, 10);
            return !isNaN(roleID) && roleID > 0;
        }, {
            message: "El rol debe ser un número positivo",
        }),
    employeeNumber: z
        .string()
        .min(1, "El número de empleado es requerido")
        .refine((val) => {
            const employeeNumber = parseInt(val, 10);
            return !isNaN(employeeNumber) && employeeNumber > 0;
        }, {
            message: "El número de empleado debe ser un número positivo",
        }),
    fullName: z
        .string()
        .min(1, "El nombre completo es requerido")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "El nombre completo solo puede contener letras, espacios y acentos"),
    bossID: z
        .string()
        .min(1, "El jefe es requerido")
        .refine((val) => {
            const bossID = parseInt(val, 10);
            return !isNaN(bossID) && bossID > 0;
        }, {
            message: "El jefe debe ser un número positivo",
        }),
    divisionID: z
        .string()
        .min(1, "La división es requerida")
        .refine((val) => {
            const divisionID = parseInt(val, 10);
            return !isNaN(divisionID) && divisionID > 0;
        }, {
            message: "La división debe ser un número positivo",
        }),
    businessUnitID: z
        .string()
        .min(1, "La unidad de negocio es requerida")
        .refine((val) => {
            const businessUnitID = parseInt(val, 10);
            return !isNaN(businessUnitID) && businessUnitID > 0;
        }, {
            message: "La unidad de negocio debe ser un número positivo",
        }),
    companySeniority: z
        .string()
        .min(1, "La fecha de inicio en la empresa es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La fecha de inicio en la empresa debe ser una fecha válida",
        }),
    positionSeniority: z
        .string()
        .min(1, "La fecha de inicio en el puesto es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La fecha de inicio en el puesto debe ser una fecha válida",
        }),
    areaID: z
        .string()
        .min(1, "El área es requerida")
        .refine((val) => {
            const areaID = parseInt(val, 10);
            return !isNaN(areaID) && areaID > 0;
        }, {
            message: "El área debe ser un número positivo",
        }),
    position: z.string().min(1, "El puesto es requerido"),
    companyContribution: z
        .string()
        .min(1, "La contribución a la empresa es requerida")
        .max(300, "La contribución a la empresa no puede exceder los 300 caracteres"),
}).refine((data) => {
    // Ensure that companySeniority is before positionSeniority
    const companyDate = new Date(data.companySeniority);
    const positionDate = new Date(data.positionSeniority);
    return isBefore(companyDate, positionDate) || companyDate.getTime() === positionDate.getTime();
}, {
    message: "Esta fecha debe ser previa o igual a la fecha de inicio en la empresa",
    path: ["positionSeniority"],
});