import { z } from "zod";
import { isBefore } from "date-fns";

export const userSchema = z.object({
    email: z
        .string()
        .email("El Correo Electrónico debe ser válido")
        .min(1, "El Correo Electrónico es requerido")
        .max(255, "El Correo Electrónico no puede exceder los 255 caracteres")
        .refine((val) => val.trim() === val, {
            message: "El Correo Electrónico no debe tener espacios al inicio o al final",
        }),
    roleID: z
        .string()
        .min(1, "El Rol es requerido")
        .refine((val) => {
            const roleID = parseInt(val, 10);
            return !isNaN(roleID) && roleID > 0;
        }, {
            message: "El Rol debe ser un número positivo",
        }),
    employeeNumber: z
        .string()
        .min(1, "El Número de Empleado es requerido")
        .max(10, "El Número de Empleado no puede exceder los 10 caracteres")
        .refine((val) => {
            const employeeNumber = parseInt(val, 10);
            return !isNaN(employeeNumber) && employeeNumber > 0;
        }, {
            message: "El Número de Empleado debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    fullName: z
        .string()
        .min(1, "El Nombre Completo es requerido")
        .max(255, "El Nombre Completo no puede exceder los 255 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "El Nombre Completo solo puede contener letras, espacios y acentos")
        .refine((val) => val.trim() === val, {
            message: "El Nombre Completo no debe tener espacios al inicio o al final",
        })
        .optional()
        .or(z.literal("")),
    bossID: z
        .string()
        .min(1, "El Jefe es requerido")
        .refine((val) => {
            const bossID = parseInt(val, 10);
            return !isNaN(bossID) && bossID > 0;
        }, {
            message: "El Jefe debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    divisionID: z
        .string()
        .min(1, "La División es requerida")
        .refine((val) => {
            const divisionID = parseInt(val, 10);
            return !isNaN(divisionID) && divisionID > 0;
        }, {
            message: "La División debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    businessUnitID: z
        .string()
        .min(1, "La Unidad de Negocio es requerida")
        .refine((val) => {
            const businessUnitID = parseInt(val, 10);
            return !isNaN(businessUnitID) && businessUnitID > 0;
        }, {
            message: "La Unidad de Negocio debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    companySeniority: z
        .string()
        .min(1, "La Fecha de Inicio en la Empresa es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La Fecha de Inicio en la Empresa debe ser una fecha válida",
        })
        .optional()
        .or(z.literal("")),
    positionSeniority: z
        .string()
        .min(1, "La Fecha de Inicio en el Puesto es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La Fecha de Inicio en el Puesto debe ser una fecha válida",
        })
        .optional()
        .or(z.literal("")),
    areaID: z
        .string()
        .min(1, "El Área es requerida")
        .refine((val) => {
            const areaID = parseInt(val, 10);
            return !isNaN(areaID) && areaID > 0;
        }, {
            message: "El Área debe ser un número positivo",
        })
        .optional()
        .or(z.literal("")),
    position: z
        .string()
        .min(1, "El Puesto es requerido")
        .max(255, "El Puesto no puede exceder los 255 caracteres")
        .refine((val) => val.trim() === val, {
            message: "El Puesto no debe tener espacios al inicio o al final",
        })
        .optional()
        .or(z.literal("")),
    companyContribution: z
        .string()
        .min(1, "La Contribución a la Empresa es requerida")
        .max(511, "La Contribución a la Empresa no puede exceder los 300 caracteres")
        .refine((val) => val.trim() === val, {
            message: "La Contribución a la Empresa no debe tener espacios al inicio o al final",
        })
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
    message: "Esta fecha debe ser posterior o igual a la Fecha de Inicio en la Empresa",
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
    message: "Esta fecha debe ser posterior o igual a la Fecha de Inicio en la Empresa",
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
    message: "Si se proporciona una División, también debe proporcionarse una Unidad de Negocio",
    path: ["divisionID"],
});

export const completeUserInfoSchema = z.object({
    id: z.number(),
    email: z
        .string()
        .min(1, "El Correo Electrónico es requerido")
        .email("El Correo Electrónico debe ser válido")
        .max(255, "El Correo Electrónico no puede exceder los 255 caracteres")
        .refine((val) => val.trim() === val, {
            message: "El Correo Electrónico no debe tener espacios al inicio o al final",
        }),
    roleID: z
        .string()
        .min(1, "El Rol es requerido")
        .refine((val) => {
            const roleID = parseInt(val, 10);
            return !isNaN(roleID) && roleID > 0;
        }, {
            message: "El Rol debe ser un número positivo",
        }),
    employeeNumber: z
        .string()
        .min(1, "El Número de Empleado es requerido")
        .max(10, "El Número de Empleado no puede exceder los 10 caracteres")
        .refine((val) => {
            const employeeNumber = parseInt(val, 10);
            return !isNaN(employeeNumber) && employeeNumber > 0;
        }, {
            message: "El Número de Empleado debe ser un número positivo",
        }),
    fullName: z
        .string()
        .min(1, "El Nombre Completo es requerido")
        .max(255, "El Nombre Completo no puede exceder los 255 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "El Nombre Completo solo puede contener letras, espacios y acentos")
        .refine((val) => val.trim() === val, {
            message: "El Nombre Completo no debe tener espacios al inicio o al final",
        }),
    bossID: z
        .string()
        .min(1, "El Jefe es requerido")
        .refine((val) => {
            const bossID = parseInt(val, 10);
            return !isNaN(bossID) && bossID > 0;
        }, {
            message: "El Jefe debe ser un número positivo",
        }),
    divisionID: z
        .string()
        .min(1, "La División es requerida")
        .refine((val) => {
            const divisionID = parseInt(val, 10);
            return !isNaN(divisionID) && divisionID > 0;
        }, {
            message: "La División debe ser un número positivo",
        }),
    businessUnitID: z
        .string()
        .min(1, "La Unidad de Negocio es requerida")
        .refine((val) => {
            const businessUnitID = parseInt(val, 10);
            return !isNaN(businessUnitID) && businessUnitID > 0;
        }, {
            message: "La Unidad de Negocio debe ser un número positivo",
        }),
    companySeniority: z
        .string()
        .min(1, "La Fecha de Inicio en la Empresa es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La Fecha de Inicio en la Empresa debe ser una fecha válida",
        }),
    positionSeniority: z
        .string()
        .min(1, "La Fecha de Inicio en el Puesto es requerida")
        .refine((val) => {
            const parsedDate = new Date(val);
            return !isNaN(parsedDate.getTime()) && isBefore(parsedDate, new Date());
        }, {
            message: "La Fecha de Inicio en el Puesto debe ser una fecha válida",
        }),
    areaID: z
        .string()
        .min(1, "El Área es requerida")
        .refine((val) => {
            const areaID = parseInt(val, 10);
            return !isNaN(areaID) && areaID > 0;
        }, {
            message: "El Área debe ser un número positivo",
        }),
    position: z
        .string()
        .min(1, "El Puesto es requerido")
        .max(255, "El Puesto no puede exceder los 255 caracteres")
        .refine((val) => val.trim() === val, {
            message: "El Puesto no debe tener espacios al inicio o al final",
        }),
    companyContribution: z
        .string()
        .min(1, "La Contribución a la Empresa es requerida")
        .max(511, "La Contribución a la Empresa no puede exceder los 300 caracteres")
        .refine((val) => val.trim() === val, {
            message: "La Contribución a la Empresa no debe tener espacios al inicio o al final",
        }),
}).refine((data) => {
    // Ensure that companySeniority is before positionSeniority
    const companyDate = new Date(data.companySeniority);
    const positionDate = new Date(data.positionSeniority);
    return isBefore(companyDate, positionDate) || companyDate.getTime() === positionDate.getTime();
}, {
    message: "Esta fecha debe ser posterior o igual a la Fecha de Inicio en la Empresa",
    path: ["positionSeniority"],
});