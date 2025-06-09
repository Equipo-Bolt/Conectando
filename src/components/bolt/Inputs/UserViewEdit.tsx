"use client";

// React and Next.js
import { useActionState, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/lib/formSchemas/userSchema";

// Shadcn Components
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Custom Components
import SubmitButton from "@/components/bolt/Buttons/SubmitButton";

// Types
import { UpdateUserFormData, User } from "@/types/User";
import { Division } from "@/types/Division";
import { Role } from "@/types/Role";
import { BusinessUnit } from "@/types/BusinessUnit";
import { Area } from "@/types/Area";

// Actions
import { updateUserAction } from "@/app/actions/user/updateUser";

// Date formatter
import { format } from "date-fns";

// Icons
import { CalendarIcon } from "@heroicons/react/24/outline";

interface DetailUserProps {
    user: UpdateUserFormData;
    divisions: Division[];
    roles: Role[];
    businessUnits: BusinessUnit[];
    bosses: User[];
    areas: Area[];
    userInfoView: boolean; // Optional prop to indicate if this is for user info view
}

export default function UserViewEdit({
    user,
    divisions,
    roles,
    businessUnits,
    bosses,
    areas,
    userInfoView,
}: DetailUserProps) {
    const router = useRouter();
    const [isEditable, setIsEditable] = useState(false);

    const form = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            id: user.id,
            email: user.email || "",
            roleID: user.roleID.toString() || "",
            employeeNumber: user.employeeNumber?.toString() || "",
            fullName: user.fullName || "",
            bossID: user.bossID?.toString() || "",
            divisionID: user.divisionID?.toString() || "",
            businessUnitID: user.businessUnitID?.toString() || "",
            companySeniority: user.companySeniority || "",
            positionSeniority: user.positionSeniority || "",
            areaID: user.areaID?.toString() || "",
            position: user.position || "",
            companyContribution: user.companyContribution || "",
        },
    });


    const [state, newAction] = useActionState(updateUserAction, null);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(data: UpdateUserFormData) {
        console.log(data.id)
        const parsedData = updateUserSchema.safeParse(data);
        if (!parsedData.success) {
            console.error("Validation errors:", parsedData.error.format());
            return;
        }

        const userData: UpdateUserFormData = {
            id: data.id,
            employeeNumber: data.employeeNumber,
            fullName: data.fullName,
            email: data.email,
            position: data.position,
            positionSeniority: data.positionSeniority,
            companySeniority: data.companySeniority,
            companyContribution: data.companyContribution,
            bossID: data.bossID,
            roleID: data.roleID,
            businessUnitID: data.businessUnitID,
            divisionID: data.divisionID,
            areaID: data.areaID,
        };

        await startTransition(() => {
            newAction(userData);
        });
    }

    useEffect(() => {
        if (state === null) return;
        else if (state.success) {
            setIsEditable(false);
            router.push(`/usuarios/detalles/${user.id}`);
        } else {
            console.error("Error updating user:", state.error);
        }
    }, [state, router, user.id]);

    // Here we are using the useState hook to manage the state of the filtered business units
    const [filteredBusinessUnits, setFilteredBusinessUnits] = useState<
        BusinessUnit[]
    >([]);

    const currentDivision = form.watch("divisionID");
    const currentBusinessUnit = form.watch("businessUnitID");

    useEffect(() => {
        // This effect will run whenever currentDivision or businessUnits change

        if (currentDivision === undefined || currentDivision === "") {
        // If no division is selected, reset the filtered business units
        setFilteredBusinessUnits(businessUnits);
        return;
        } else {
        // Filter the business units based on the selected division
        const filtered = businessUnits.filter(
            (bu) => bu.divisionID === parseInt(currentDivision || "0", 10)
        );
        setFilteredBusinessUnits(filtered);
        form.setValue("businessUnitID", filtered[0]?.id.toString() || "");
        }

    }, [currentDivision, businessUnits, form]);

    useEffect(() => {
        // Assign current Division to matching business units division
        if (currentBusinessUnit && currentBusinessUnit !== "") {
        const matchingBU = businessUnits.find(
            (bu) => bu.id === parseInt(currentBusinessUnit, 10)
        );
        if (matchingBU) {
            form.setValue("divisionID", String(matchingBU.divisionID));
        }
        }
    }, [currentBusinessUnit, businessUnits, form]);

    return (
        <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {isPending ? (
            <p className="text-blue-600">Enviando...</p>
            ) : state?.success ? (
            <h1>Resultado: {state.message} </h1>
            // ) : (state?.success === false) ? (   //! THE ERROR MESSAGE ISNT BEING DISPLAYED TO THE USER?
            // <h1 className="text-red-600">Resultado: {state.error} </h1>
            ) : (
            <></>
            )}
            <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3">
            <div className="flex flex-col gap-[1rem]">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>
                        Correo Electrónico del Usuario
                        <p className="text-gemso-red"> *</p>
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                        <Input
                        disabled={!isEditable}
                        placeholder="ejemplo@gemso.com"
                        
                        {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="employeeNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Número de Empleado</FormLabel>
                    <FormMessage />
                    <FormControl>
                        <Input
                        disabled={!isEditable}
                        placeholder="Escribe tu número de empleado"
                        {...field}
                        type="number"
                        min={1}
                        maxLength={10}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="companySeniority"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio en la Empresa</FormLabel>
                    <FormMessage />
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            disabled={!isEditable}
                            className={cn(
                                "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between px-[1rem] [&_svg:not([class*='size-'])]:size-6",

                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(new Date(field.value), "dd/MM/yyyy")
                            ) : (
                                <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="text-primary" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={
                            field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                            if (date) {
                                field.onChange(date.toISOString());
                            }
                            }}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="divisionID"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>División</FormLabel>
                    <FormMessage />
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditable}
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue
                        placeholder="Selecciona una división" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {divisions.map((division) => (
                            <SelectItem
                            key={division.id}
                            value={String(division.id)}
                            >
                            {division.title}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="areaID"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Área de Trabajo</FormLabel>
                    <FormMessage />
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditable}
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue
                        placeholder="Selecciona un área" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {areas.map((area) => (
                            <SelectItem key={area.id} value={String(area.id)}>
                            {area.title}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>

                    </FormItem>
                )}
                />
            </div>

            <div className="flex flex-col gap-[1rem]">
                <FormField
                control={form.control}
                name="roleID"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>
                        Roles<p className="text-gemso-red"> *</p>
                    </FormLabel>
                    <FormMessage />
                    <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditable}
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue
                        placeholder="Seleccionar" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                            {role.title}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormMessage />
                    <FormControl>
                        <Input
                        disabled={!isEditable}
                        placeholder="Escribe tu nombre completo"
                        {...field}
                        />
                    </FormControl>

                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="positionSeniority"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio en el puesto</FormLabel>
                    <FormMessage />
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            disabled={!isEditable}
                            variant="outline"
                            className={cn(
                                "w-full text-accent-foreground font-normal bg-primary-foreground border border-gray-500 rounded-lg h-[3rem] text-small focus-visible:ring-[1px] hover:bg-primary-foreground justify-between px-[1rem] [&_svg:not([class*='size-'])]:size-6",

                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(new Date(field.value), "dd/MM/yyyy")
                            ) : (
                                <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="text-primary" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={
                            field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                            if (date) {
                                field.onChange(date.toISOString());
                            }
                            }}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>

                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="businessUnitID"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Unidad de Negocio</FormLabel>
                    <FormMessage />
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditable}
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue
                        placeholder="Selecciona una unidad" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {filteredBusinessUnits.map((bu) => (
                            <SelectItem key={bu.id} value={String(bu.id)}>
                            {bu.title}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>

                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="bossID"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Jefe Directo</FormLabel>
                    <FormMessage />
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditable}
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue
                        placeholder="Selecciona un jefe" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {bosses.map((boss) => (
                            <SelectItem key={boss.id} value={String(boss.id)}>
                            {boss.fullName}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>

                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col gap-[1rem]">
                <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Puesto</FormLabel>
                    <FormMessage />
                    <FormControl>
                        <Input
                        disabled={!isEditable}
                        placeholder="Escribe el nombre de tu puesto"
                        {...field}
                        />
                    </FormControl>

                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="companyContribution"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Contribución</FormLabel>
                    <FormMessage />
                    <FormControl>
                        <Textarea
                        disabled={!isEditable}
                        placeholder="Cómo contribuye tu puesto a la estrategia de GEMSO"
                        {...field}
                        className="min-h-[8.5rem] max-h-[19rem] w-full resize-none"
                        />
                    </FormControl>

                    </FormItem>
                )}
                />
            </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 w-full">
            {isEditable ? (
                <>
                <Button
                    variant={"gemso_white_and_blue"}
                    type="button"
                    onClick={() => {
                    form.reset();
                    setIsEditable(false);
                    }}
                >
                    Cancelar edición
                </Button>
                <SubmitButton text="Guardar Cambios" isPending={isPending} />
                </>
            ) : (
                userInfoView ? (
                <Button
                type="button"
                variant={"gemso_blue"}
                onClick={() => setIsEditable(true)}
                >
                Editar Usuario
                </Button>
                ) : null
            )}
            </div>
        </form>
        </Form>
    );
}